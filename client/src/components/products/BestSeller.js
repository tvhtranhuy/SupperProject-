import React, { useState, useEffect, memo } from "react"
import { apiGetProducts } from "apis/product"
import { CustomSlider } from "components"
import { getNewProducts } from "store/products/asynsActions"
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
]

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null)
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState(null)
  const dispatch = useDispatch()
  const { newProducts } = useSelector((state) => state.products)
  // console.log(newProducts)
  const { isShowModal } = useSelector((state) => state.app)

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" })
    if (response.success) {
      // console.log({ bestSellers, newProducts })
        // Bắt điều kiện cho 2 hàm kiểm tra xem cuộc gọi API đầu tiên (response[0]) có thành công hay không. 
        // Nếu có (success là true) và sẽ được cập nhật state bestSellers và products với dữ liệu trả về từ cuộc gọi API đó.
      setBestSellers(response.products)
      setProducts(response.products)
    }
  }
  useEffect(() => {
    fetchProducts()
    dispatch(getNewProducts())
  }, [])
  // Bắt hàm phụ thuộc vào 2 setProducts chính hàm xử lý nút sẽ ở dưới
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers)
    if (activedTab === 2) setProducts(newProducts)
  }, [activedTab])
  return (
    <div className={clsx(isShowModal ? "hidden" : "")}>
      <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold text-center md:text-start uppercase px-8 border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 hidden md:block mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="mt-4 md:hidden block mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider
          products={products}
          slidesToShow={1}
          activedTab={activedTab}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
        <img
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/04/banner/sac-AVA-720-220-720x220-1.png"
          alt="banner"
          className="flex-1 h-[140px] w-[222px] object-contain"
        />
        <img
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/04/banner/Upgrade-iPhone-720-220--1--720x220-1.png"
          alt="banner"
          className="flex-1 h-[140px] w-[222px] object-contain"
        />
      </div>
    </div>
  )
}

export default memo(BestSeller)

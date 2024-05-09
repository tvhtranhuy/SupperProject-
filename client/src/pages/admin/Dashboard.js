import { apiGetDashboard } from "apis"
import BoxInfo from "components/chart/BoxInfo"
import CustomChart from "components/chart/CustomChart"
import React, { useEffect, useState } from "react"
import { AiOutlineUserAdd } from "react-icons/ai"
import { formatMoney } from "ultils/helpers"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend)
const Dashboard = () => {
  // sử dụng useState để lưu trữ dữ liệu ('data') cài đặt chế độ hiển thị theo tháng hoặc ngày (isMonth), và thời gian tùy chỉnh (customTime)
  const [data, setData] = useState()
  const [isMonth, setIsMonth] = useState(false)
  const [customTime, setCustomTime] = useState({
    from: "",
    to: "",
  })
  const fetchDataDashboard = async (params) => {
    const response = await apiGetDashboard(params)
    if (response.success) setData(response.data)
  }
  // Sử dụng useEffect để gọi fetchDataDashboard khi có sự thay đổi đến từ vị trí của user khi mua hàng sẽ được thiết lập ngày sản phẩm đã được mua hoặc tạo tài khoảng
  useEffect(() => {
    const type = isMonth ? "MTH" : "D"
    const params = { type }
    if (customTime.from) params.from = customTime.from
    if (customTime.to) params.to = customTime.to
    fetchDataDashboard(params)
  }, [isMonth, customTime])
  const handleCustomTime = () => {
    setCustomTime({ from: "", to: "" })
  }

  // Sử dụng pieData để tạo biểu đồ hình tròn được thay đổi dữ liệu sau khi thông qua mỗi đơn hàng thành công hay đơn hàng đã hủy trong ngày tháng đó. 
  // Đi kèm đó là biểu đồ đường của CustomChart kết hợp với time của tuần tháng đó để phân tích và tạo dữ liệu biể đồ cho bên admin
  const pieData = {
    labels: ["Tông đơn đã hủy", "Tổng đơn thành công"],
    datasets: [
      {
        label: "Tổng đơn",
        data: [
          data?.pieData?.find((el) => el.status === "Cancelled")?.sum,
          data?.pieData?.find((el) => el.status === "Succeed")?.sum,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="w-full flex flex-col gap-4 bg-gray-50 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full bg-gray-50 flex items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-4 gap-4">
          <BoxInfo
            text="Số thành viên mới"
            icon={<AiOutlineUserAdd size={22} />}
            number={data?.users[0]?.count}
            className="border-blue-500 text-white bg-blue-500"
          />
          <BoxInfo
            text="Số tiền đã được thanh toán"
            icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.totalSuccess?.length > 0
                ? formatMoney(Math.round(data?.totalSuccess[0]?.count * 23500))
                : 0
            }
            className="border-green-500 text-white bg-green-500"
          />
          <BoxInfo
            text="Số tiền chưa thanh toán"
            icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.totalFailed?.length > 0
                ? formatMoney(Math.round(data?.totalFailed[0]?.count * 23500))
                : 0
            }
            className="border-orange-500 text-white bg-orange-500"
          />
          <BoxInfo
            text="Số sản phẩm đã bán"
            icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.soldQuantities?.length > 0
                ? data?.soldQuantities[0]?.count
                : 0
            }
            className="border-yellow-500 text-white bg-yellow-500"
          />
        </div>
        <div className="mt-6 grid grid-cols-10 gap-4">
          <div className="col-span-7 min-h-[500px] border flex flex-col gap-4 relative rounded-md flex-auto p-4">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-8">
                <span>{`Thông kê doanh thu theo ${
                  isMonth ? "tháng" : "ngày"
                }`}</span>
                <div className="flex items-center font-thin gap-8">
                  <span className="flex items-center gap-2">
                    <label htmlFor="from">Từ</label>
                    <input
                      type="date"
                      value={customTime.from}
                      onChange={(e) =>
                        setCustomTime((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                      id="from"
                    />
                  </span>
                  <span className="flex items-center gap-2">
                    <label htmlFor="from">Đến</label>
                    <input
                      type="date"
                      value={customTime.to}
                      onChange={(e) =>
                        setCustomTime((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                      id="to"
                    />
                  </span>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border-blue-500 text-blue-500 border`}
                    onClick={handleCustomTime}
                  >
                    Default
                  </button>
                </div>
              </span>
              <span className="flex items-center">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                    isMonth ? "" : "text-white font-semibold bg-main"
                  }`}
                  onClick={() => setIsMonth(false)}
                >
                  Ngày
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                    isMonth ? "text-white font-semibold bg-main" : ""
                  }`}
                  onClick={() => setIsMonth(true)}
                >
                  Tháng
                </button>
              </span>
            </div>
            {data?.chartData && (
              <CustomChart
                customTime={customTime}
                isMonth={isMonth}
                data={data?.chartData}
              />
            )}
          </div>
          <div className="col-span-3 rounded-md border p-4">
            <span className="font-bold gap-8">
              Tổng số đơn hủy và số đơn đã thanh toán thành công
            </span>
            <div>
              <Pie data={pieData} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

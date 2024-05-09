import React, { memo } from "react"
import { useDispatch } from "react-redux"
import { showModal } from "store/app/appSlice"

const Modal = ({ children }) => {
  const dispatch = useDispatch()
  // tạo trang modal được gắn vào appSlice để show trên mặt app của appSlice
  // thông qua file ProductImfomation
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="absolute inset-0 z-[99999] bg-overlay flex items-center justify-center"
    >
      {children}
    </div>
  )
}

export default memo(Modal)

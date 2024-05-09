import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Congrat = () => {
    // sử dụng Confetti để tạo hiệu ứng đăng kí thành công
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
        />)
}

export default Congrat
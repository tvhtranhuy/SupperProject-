import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let localStorageData = window.localStorage.getItem('persist:shop/user');
try {
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData);
        const accessToken = JSON.parse(localStorageData?.token);
        if (accessToken) {
            config.headers = { authorization: `Bearer ${accessToken}` };
        }
    }
} catch (err) {
    console.error("Error parsing localStorage data:", err);
}
return config;

});

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.response) {
            // Lỗi từ phía máy chủ (HTTP status code không phải 2xx)
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Không nhận được phản hồi từ máy chủ
            return Promise.reject({ message: "No response received from server" });
        } else {
            // Lỗi khi cấu hình yêu cầu
            return Promise.reject({ message: error.message });
        }
    }
);


export default instance
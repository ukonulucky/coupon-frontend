import axios from "axios"


const options= {
    baseURL:"https://coupon-server-apis.onrender.com"
}

const axiosInstance = axios.create(options)



export default axiosInstance



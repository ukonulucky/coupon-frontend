import axios from "axios"


const options= {
    // baseURL:"https://coupon-server-apis.onrender.com",
    baseURL:"http://localhost:5000"
}

export default axios.create(options)



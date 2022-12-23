import axios from "axios"


const options= {
    baseURL:"https://coupon-server-apis.onrender.com",
    withredentials:true
}

export default axios.create(options)



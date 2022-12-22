import React, {useEffect, useState, useReducer} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from "../images/coupon.jpg"
import "../styles/home.css"
import {Link, useLocation} from "react-router-dom"
import axios from "axios"
import ResponsiveExample from './Sidebar';
import PayStack from './Paystack';

function Home() {

    const location = useLocation()
    const [isUserAdmin, setIsUserAdminn] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState("")
    const [coupon, setCoupon] = useState(null)
    const [couponToShow, setCouponToShow] = useState(null)
 
    function filterTodoByState(myState) {
    const data =    coupon.filter((i) => {
                return i.state === myState
        })
        if(data.length > 0){
            setCouponToShow(data)
        }else{
            console.log('HI I JUST RAN')
            setCouponToShow(coupon)
        }
       
    }

 
    const getAllCoupons = async() => {
        try {
    const couponData = await axios.get("http://localhost:5000/api/coupon/getAllCoupons",{
        withCredentials: true})
        console.log(couponData)
   if(!couponData){
       setCoupon([])
       return
   }
   setCoupon(couponData.data)
   setCouponToShow(couponData.data)
        } catch (error) {
            if(error.respons){
                console.log(error.response.data.message)
            }else{
                console.log(error.message)
            }
        }
    }
 
    useEffect(() => {
        setUserLoggedIn(location.state)
          },[])
    useEffect(() => {
  getAllCoupons()
 
    },[])

    const couponElement = couponToShow?.map((i,j) => {
    return <Card key={j} className="d-grid m-5">
      <Card.Header as="h5">Coupon Category:{i.category}</Card.Header>
      <Card.Body>
        <Card.Title>Coupon Type:{i.couponType}</Card.Title>
        <Card.Title>Coupon Location:{i.state}</Card.Title>
        <Card.Title>Coupon Discount:{i.percent}</Card.Title>
        <Card.Title>Coupon Code:{i.couponId}</Card.Title>
        <Button variant="primary">Click To Purchase</Button>
      </Card.Body>
    </Card>
    })
    const logOutUser = async() => {
       try {
        const data = await axios.get("http://localhost:5000/api/user/logout", {
            withCredentials: true
        })
        if(data.status == 200){
            alert("user successfully logged out")
            setUserLoggedIn("")
        }
       } catch (error) {
           if(error.response){
               alert(error.response.data.message)
           }else{
            alert(error.message)
           }
       }
    }
  return (
    <div className="wrapper">
        <div className="wrapper-navbar">
            <img src={logo} alt="coupon logo" />
            <div className="text">
               {
                userLoggedIn ?  <>
                <span>Welcome {userLoggedIn.email}</span>
               
               {
                userLoggedIn.role === "admin" ? <> 
                <Link to="/createCoupon">
               Create Coupon
               </Link>
               <Link to="/admin">Admin Dashboard</Link>
                </> :
                ""
               }
                {
                userLoggedIn.role === "vendor" ? <Link to="/admin">Vendor Dashboard</Link>:
                ""
               }
                 {
                    userLoggedIn.role === "user" ? <button>
                    <PayStack userEmail =  {userLoggedIn.email} />
                </button> : ""
                 }
                <button onClick = {logOutUser}>
                    Log Out
                </button>
                </> :
                <button> 
                    <Link to="/login">
                    Login In
                    </Link>
                </button>
               }

            </div>
        </div>
        {
            coupon ? <div className='wrapper-container'>
                <div className="sidebar">
                    <ResponsiveExample couponsProp = {coupon} filterTodoByState={filterTodoByState} />
                </div>
                <div className="wrapper-content">
                    {couponElement}
                </div>
               
            </div>:<div className="spiner">
            <Spinner animation="grow" />
            </div>
        }
    </div>
  )
}

export default Home
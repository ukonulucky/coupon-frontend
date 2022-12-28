import React, {useEffect, useState, useReducer} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from "../images/coupon.jpg"
import "../styles/home.css"
import {Link, useLocation} from "react-router-dom"
import axios from "./axios"
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
        console.log(i.state, myState)
                return i.state?.toLowerCase() === myState?.toLowerCase()
        })
        if(data.length > 0){
            setCouponToShow(data)
        }else{
            console.log('HI I JUST RAN')
            setCouponToShow(coupon)
        }  
       
    }

    function filterTodoByCategory(category) {
        const data =    coupon.filter((i) => {
            console.log(i.state, category)
                    return i.category?.toLowerCase() === category?.toLowerCase()
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
    const couponData = await axios.get("api/coupon/getAllCoupons",{withCredentials: true})
        console.log(couponData)
   if(!couponData){
       setCoupon([])
       return
   }
   setCoupon(couponData.data)
   setCouponToShow(couponData.data)
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }else{
                console.log(error.message)
            }
        }
    }
 
    useEffect(() => {
setUserLoggedIn(location.state)
  getAllCoupons()
 
    },[])


    const couponElementForOpen = couponToShow?.map((i,j) => {
   if(i.couponType === "open"){
    return <Card key={j} className="d-grid m-5">
    <Card.Header as="h5" className='bg-secondary'>
    <span className='h4 text-capitalize text-white'>
      Coupon Category:
    {i.category}
    </span>
    </Card.Header>
    <Card.Body>
      <Card.Title>Coupon Type:{i.couponType}</Card.Title>
      <Card.Title>Coupon Location:{i.state}</Card.Title>
      <Card.Title>Coupon Discount:{i.percent}</Card.Title>
      <Card.Title>Coupon Code:{i.couponId}</Card.Title>
      <Card.Title>Amount:{i.amount}</Card.Title>
    </Card.Body>
  </Card>
   }
    })

    const couponElementForPremium = couponToShow?.map((i,j) => {
        return <Card key={j} className="d-grid m-5">
          <Card.Header as="h5" className='bg-secondary'>
          <span className='h4 text-capitalize text-white'>
            Coupon Category:
          {i.category}
          </span>
          </Card.Header>
          <Card.Body>
            <Card.Title>Coupon Type:{i.couponType}</Card.Title>
            <Card.Title>Coupon Location:{i.state}</Card.Title>
            <Card.Title>Coupon Discount:{i.percent}</Card.Title>
            <Card.Title>Coupon Code:{i.couponId}</Card.Title>
            <Card.Title>Amount:{i.amount}</Card.Title>
           {
            userLoggedIn ?  
            <Card.Title>
                 <PayStack userEmail={userLoggedIn.email} amount={(i.amount)/2} id={i._id} /> 
            </Card.Title>
           : ""
           }
          </Card.Body>
        </Card>
        
        })

        const couponElementForHidden = couponToShow?.map((i,j) => {
            if(i.couponType !== "premium"){
              return  <Card key={j} className="d-grid m-5">
                <Card.Header as="h5" className='bg-secondary'>
                <span className='h4 text-capitalize text-white'>
                  Coupon Category:
                {i.category}
                </span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Coupon Type:{i.couponType}</Card.Title>
                  <Card.Title>Coupon Location:{i.state}</Card.Title>
                  <Card.Title>Coupon Discount:{i.percent}</Card.Title>
                  <Card.Title>Coupon Code:{i.couponId}</Card.Title>
                  <Card.Title>Amount:{i.amount}</Card.Title>
                 {
                  userLoggedIn ?  
                  <Card.Title>
                       <PayStack userEmail={userLoggedIn.email} amount={i.amount} id={i._id} /> 
                  </Card.Title>
                 : ""
                 }
                </Card.Body>
              </Card>
            }})
            
            
const componenToDisplayFunc = function () {
    if(userLoggedIn?.role === "admin"){
        return couponElementForPremium
    }
    if(userLoggedIn?.role === "user"){
        return couponElementForHidden
    }
    return couponElementForOpen
}

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
    const componentToDisplay = componenToDisplayFunc()
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
                <Link to="/createCoupon" state={userLoggedIn}>
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
                    userLoggedIn.role === "user" ? 
                    <PayStack userEmail =  {userLoggedIn.email} />
                 : ""
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
                    <ResponsiveExample  couponsProp = {coupon} filterTodoByState={filterTodoByState}
                    filterTodoByCategory = {filterTodoByCategory}
                    />
                </div>
                <div className="wrapper-content">
                {
                    componentToDisplay
                }
                </div>
               
            </div>:<div className="spiner">
            <Spinner animation="grow" />
            </div>
        }
    </div>
  )
}

export default Home
import React, {useEffect, useState, useReducer} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import "../styles/home.css"
import { useLocation, useNavigate, Link} from "react-router-dom"
import axios from "./axios"
import Model2 from './Model2';
import logo from "../images/coupon.jpg"



function AdminPanel() {
    const navigate = useNavigate()
    const location = useLocation()
    
   
    const [loggedInUser, setLoggedInUser] = useState("");
    const [firstName, setFirstName] = useState("");
  const [spinnerState, setSpinnerState] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("user");
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState("")
    const [coupon, setCoupon] = useState(null)
    const [couponToShow, setCouponToShow] = useState(null)
    const [category, setCategory] = useState("");
    const [state, setState] = useState("");
    const [percent, setPercent] = useState("");
    const [couponType, setCouponType] = useState("")
    const [reload, setReload] = useState(false)

    const handleApproveCoupon =async (id) => {
      try {
        const res = await axios.get(`api/coupon/activateCoupon/${id}`,{
          withCredentials: true
        })
        console.log("this is the resfrom coupon", res)
        if (res.status === 200){
          alert("coupon successfully activated")
          setReload(!reload)
        }
      } catch (error) {
        if(error.response.data.message){
               alert("error: " + error.response.data.message)
               return
        }
      alert("error: " + error.message)
      }
    }

    const handleDeleteCoupon =async (id) => {
      try {
        const res = await axios.delete(`api/coupon/purchase/${id}`,{
          withCredentials: true
        })
        console.log("this is the resfrom coupon", res)
        if (res.status === 200){
          alert("coupon successfully deleted")
          setReload(!reload)
        }
      } catch (error) {
        if(error.response.data.message){
               alert("error: " + error.response.data.message)
               return
        }
      alert("error: " + error.message)
      }
    }  

    const submitForm = async (e) => {
        e.preventDefault();
        setSpinnerState(true)
        const data ={
            firstName, lastName, email, passWord, role
        }
        console.log(data)
        try {
            const res = await axios.post("api/user/registervendor", data,{
              withCredentials: true
            })
            console.log(res)
            if(res.data){
              setSpinnerState(false)
                console.log(res.data)
                   alert("user registration successfully")
            }else{
              setSpinnerState(false)
                alert("user registration failed")
            }
        } catch (error) {
          setSpinnerState(false)
            if(error.response){
              alert(error.response.data.message)
            }else{
              alert(error.message)
            }
        }
  }
 
    const getAllCoupons = async() => {
        try {
    const couponData = await axios.get("api/coupon/getAllCoupons",{
        withCredentials: true})
        if(couponData.status === 404){
        alert("Page restricted to only addmin")
         navigate("/login")
         return
        }
   if(!couponData){
       setCoupon([])
       return
   }
   setCoupon(couponData.data)
   setCouponToShow(couponData.data)
   console.log("this is the location", location)
   setLoggedInUser(location.state)
        } catch (error) {
            if(error.respons){
                console.log(error.response.data.message)
            }else{
                console.log(error.message)
            }
        }
    }
 
    useEffect(() => {
  getAllCoupons()
 
    },[reload])

const handleReload = () => {
  setReload(!reload)
}
    const couponElement = couponToShow?.map((i,j) => {
    return <Card key={i._id} className="d-grid m-5">
      <Card.Header as="h5">Crated By:{i.createdBy?.email}</Card.Header>
      <Card.Body>
      <Card.Title>Coupon Category:{i.category}</Card.Title>
        <Card.Title>Coupon Type:{i.couponType}</Card.Title>
        <Card.Title>Coupon Location:{i.state}</Card.Title>
        <Card.Title>Coupon Discount:{i.percent}</Card.Title>
        <Card.Title>Amount:{i.amount}</Card.Title>
        <Card.Title>Status:{i.createdBy?.role.toUpperCase()}</Card.Title>
        <Card.Title>Coupon Approved:{i.isCouponApproved ? "True":"False"}</Card.Title>
        {
          i.isCouponApproved ? "" :
          <Button onClick={() => {
            handleApproveCoupon(i._id)
          }}>Click To Approve Coupon</Button>
        }
        <Card.Title>
        <Button className='mt-3' onClick={() => {
            handleDeleteCoupon(i._id)
          }}>Delete Coupon</Button>
        </Card.Title>
        
      <Model2 createdBy={i.createdBy?._id}  handleReload= {handleReload} />
      <Card.Title>Amount:{i.amount}</Card.Title>
      </Card.Body>
   
    </Card>
    })
   
  return (
    <div className="wrapper ">
        {
            couponToShow ? <div className='container-fluid d-flex flex-column align-items-center gap-5'>

                 <Link to="/" style={{
                cursor: 'pointer',
                display: 'flex',
                marginRight: "auto"
              }}>
                  <img className='d-block mr-auto' 
               
              src={logo} alt="coupon logo" /> 
                </Link>
              
              
            
              
                <div className="wrapper-content">
                    {couponElement}
         <Form onSubmit={submitForm} className="mt-3">
        <h2 className='d-flex justify-content-center align-items-center'>Create Vendor</h2>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter Last Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Choose Role</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => {
             setRole(e.target.value)
        }}>
      <option>Select A Role</option>
      <option value="vendor">Vendor</option>
     
    </Form.Select>
   
          
          </Form.Group>
        <Button variant="primary d-flex align-items-center gap-2" type="submit">
          <span className="mr-3">Submit</span>
          {
        spinnerState ?   <Spinner animation="border" size="sm" role="status" className="mr-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : ""
       }
        </Button>
      </Form>
                </div>
            </div>:<div className="spiner">
            <Spinner animation="grow" />
            </div>
        }
    </div>
  )
}

export default AdminPanel
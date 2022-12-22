import React, {useEffect, useState, useReducer} from 'react'
import logo from "../images/coupon.jpg"
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import "../styles/home.css"
import {Link, useNavigate} from "react-router-dom"
import axios from "./axios"
import ResponsiveExample from './Sidebar';
import MyVerticallyCenteredModal from './Model';


function Admin() {
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false);
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
    const [couponType, setCouponType] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        setSpinnerState(true)
        const data ={
            firstName, lastName, email, passWord, role
        }
        console.log(data)
        try {
            const res = await axios.post("/api/user/registervendor", data, {
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
    const couponData = await axios.get("/api/coupon/getAllCoupons",{
        withCredentials: true})
        console.log(couponData)
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
 
    },[])

    const couponElement = couponToShow?.map((i,j) => {
    return <Card key={j} className="d-grid m-5">
      <Card.Header as="h5">Crated By:{i.createdBy.email}</Card.Header>
      <Card.Body>
      <Card.Title>Coupon Category:{i.category}</Card.Title>
        <Card.Title>Coupon Type:{i.couponType}</Card.Title>
        <Card.Title>Coupon Location:{i.state}</Card.Title>
        <Card.Title>Coupon Discount:{i.percent}</Card.Title>
        <Card.Title>Status:{i.createdBy.role.toUpperCase()}</Card.Title>
        <Card.Title>Coupon Approved:{i.isCouponApproved ? "True":"False"}</Card.Title>
        <Card.Title>Coupon Code:{i.couponId}</Card.Title>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Coupon Code
      </Button>
      <MyVerticallyCenteredModal _id={i.createdBy._id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        
      </Card.Body>
     {
        i.isCouponApproved ? "" :  <Button  style={{
            width:"max-content"
          }}>
                Click To Approve
            </Button>
     }
    </Card>
    })
   
  return (
    <div className="wrapper ">
        <div>
            <div className="container">
               <Link to="/">
               <img className='mr-auto w-25 '  src={logo} alt="logo" />
               </Link>
            </div>
        </div>
        {
            coupon ? <div className='container-fluid d-flex flex-column align-items-center gap-5'>
                <div className="wrapper-content">
                    {couponElement}
                </div>
                <Form onSubmit={submitForm}>
        <h2>Create Vendor Form</h2>
        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
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
          <Form.Label>Last Name:</Form.Label>
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
          <Form.Label>Email address:</Form.Label>
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
          <Form.Label>Password:</Form.Label>
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
        <Form.Label>Choose Role:</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => {
             setRole(e.target.value)
        }}>
      <option>Select A Role</option>
      <option value="user">User</option>
      <option value="vendor">Vendor</option>
      <option value="admin">Admin</option>
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
            </div>:<div className="spiner">
            <Spinner animation="grow" />
            </div>
        }
    </div>
  )
}

export default Admin
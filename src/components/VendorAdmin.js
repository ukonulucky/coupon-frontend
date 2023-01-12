import React, {useEffect, useState} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import "../styles/home.css"
import { useLocation, useNavigate, Link} from "react-router-dom"
import axios from "./axios"
import logo from "../images/coupon.jpg"



function VendorAdminPanel() {
  const navigate = useNavigate()
  const location = useLocation()
   
    const [loggedInUser, setLoggedInUser] = useState("")
    const [firstName, setFirstName] = useState("");
  const [spinnerState, setSpinnerState] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("user");
   
   
    const [coupon, setCoupon] = useState(null)
    const [couponToShow, setCouponToShow] = useState(null)
    const [category, setCategory] = useState("");
    const [state, setState] = useState("");
    const [percent, setPercent] = useState("");
    const [couponType, setCouponType] = useState("")
    const [amount, setAmount] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [reload, setReload] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault();
        setSpinnerState(true)
        const data ={
            amount, couponType, percent, state, category, createdBy
        }
                try {
            const res = await axios.post("api/coupon/createCouponForVendor", data,{
              withCredentials: true
            })
            if(res.data){
              setSpinnerState(false)
                console.log(res.data)
                   alert("coupon creation successful")
                   setReload(!reload)
                   setAmount("")
                   setCategory("")
                   setPercent("")
                   setState("")
                   setCouponType("")
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
      console.log("this is the location", location.state.userId)
      setCreatedBy(location.state.userId)
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


    const couponElement = couponToShow?.map((i,j) => {
    return <Card key={i._id} className="d-grid m-5">
      <Card.Header as="h5">Crated By:{i.createdBy?.email}</Card.Header>
      <Card.Body>
      <Card.Title>Coupon Category:{i.category}</Card.Title>
        <Card.Title>Coupon Type:{i.couponType}</Card.Title>
        <Card.Title>Coupon Location:{i.state}</Card.Title>
        <Card.Title>Coupon Discount:{i.percent}</Card.Title>
        <Card.Title>Amount:{i.amount}</Card.Title>
        <Card.Title>Coupon Approved:{i.isCouponApproved ? "True":"False"}</Card.Title>
        <Card.Title>Coupon Code:{i.couponId}</Card.Title>
        
    
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
                    <Form onSubmit={submitForm}>
    
    <Form.Group className="mb-3">
      <h3 className='mt-3 d-flex align-items-center justify-content-center'>Create Coupon</h3>
      <Form.Label>Category:</Form.Label>
      <Form.Select aria-label="Default select example" onChange={(e) => {
         setCategory(e.target.value)  
    }} required>
  <option>Select A Category</option>
  <option value="E-commerce">E-commerce</option>
  <option value="engineering">Engineering</option>
  <option value="Learning">Learning</option>
  <option value="sofware">software</option>
</Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>State:</Form.Label>
      <Form.Select aria-label="Default select example" required onChange={(e) => {
         setState(e.target.value)
    }}>
  <option>Select A State</option>
  <option value="imo">Imo</option>
  <option value="lagos">Lagos</option>
  <option value="anambra">Anambra</option>
</Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicpersent">
      <Form.Label className="container-fluid">Discount(%):</Form.Label>
      <Form.Control required
        type="text"
        placeholder="Enter percent"
        onChange={(e) => {
          setPercent(e.target.value);
        }}
      
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasiccouponType">
      <Form.Label>couponType:</Form.Label>
      <Form.Select aria-label="Default select example" onChange={(e) => {
         setCouponType(e.target.value)
    }} required>
  <option>Select Coupon Type</option>
  <option value="open">Open</option>
  <option value="hidden">Hidden</option>
  <option value="premium">Premium</option>
</Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicpersent">
      <Form.Label className="container-fluid">Amount:</Form.Label>
      <Form.Control required
        type="Number"
        placeholder="Enter Amount"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      
      />
    </Form.Group>
    <Button variant="primary d-flex align-items-center gap-3" type="submit">
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

export default VendorAdminPanel
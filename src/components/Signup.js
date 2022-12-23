import axios from "./axios"
import Spinner from 'react-bootstrap/Spinner';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/login.css"
import {Link, useNavigate} from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [spinnerState, setSpinnerState] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("user");

  const submitForm = async (e) => {
        e.preventDefault();
        setSpinnerState(true)
        const data ={
            firstName, lastName, email, passWord, role
        }
        console.log(data)
        try {
            const res = await axios.post("api/user/register", data)
            console.log(res)
            if(res.data){
              setSpinnerState(false)
                console.log(res.data)
                   alert("user registration successfully")
                   navigate("/login")
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
  return (
 
    <div className="login-container">
      <Form onSubmit={submitForm}>
        <h2>Signup Form</h2>
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
    <div class="messages">
      <span>Allready have an account? <Link to="/login">click to login</Link></span>
    </div>
    </div>
  );
}

export default Signup;

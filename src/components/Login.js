import axios from "./axios"
import Spinner from 'react-bootstrap/Spinner';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/login.css"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"; 

function Login() {
  const navigate = useNavigate()
  const [spinnerState, setSpinnerState] = useState(false)
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("");
  

  const submitForm = async (e) => {
        e.preventDefault();
        const data ={
           email, passWord, role
        }
        setSpinnerState(true)
        try {
            const res = await axios.post("/api/user/login",data,{
              withCredentials: true
            })
            if(res.data){
              setSpinnerState(false)
                console.log(res.data)
                const {email,role} = res.data
                   alert("user login successfully")
                   navigate("/", {
                    state:{
                     email,role
                    }
                   })
            }else{
              setSpinnerState(false)
                alert("user login failed")
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
      <h2>Login Form</h2>
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
      
       <Button variant="primary d-flex gap-2 align-items-center" type="submit">
         <span className="mr-3">
         Submit
         </span>
       {
        spinnerState ?   <Spinner animation="border" size="sm" role="status" className="mr-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : ""
       }
        </Button>
      </Form>
      <div class="messages">
      <span>Don't have an account? <Link to="/signup">click to create account</Link></span>
    </div>
    </div>
  );
}

export default Login;

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from "react-bootstrap/Form";
import {useState} from "react"
import axios from "./axios"

function MyVerticallyCenteredModal(props) {
    console.log('this is the props', props)
  const [spinnerState, setSpinnerState] = useState("");
    const [category, setCategory] = useState("");
    const [state, setState] = useState("");
    const [percent, setPercent] = useState("");
    const [couponType, setCouponType] = useState("");
    const [amount, setAmount] = useState("");
    const _id = props._id
    const submitForm = async (e) => {
        e.preventDefault();
        setSpinnerState(true)
        const data ={
            category, state, percent, couponType, _id, amount
        }
        try {
            const res = await axios.post("api/coupon/createCouponForVendor", data, {
                withCredentials: true
            })
            console.log(res)
            if(res.data){
              setSpinnerState(false)
                   alert("coupon creation Successfully")
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
    <Modal
       {...props}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Create Coupon For Vendor  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={submitForm}>
    
        <Form.Group className="mb-3">
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal
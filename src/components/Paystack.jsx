import React, {useState} from 'react';
import Button from 'react-bootstrap/esm/Button';
import { usePaystackPayment } from 'react-paystack';
import axios from './axios';



const config = (userEmail, amount) => {
    return {
        reference: (new Date()).getTime().toString(),
        email:userEmail,
        amount: amount ? amount * 100 : 2000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_8b8bfac8965a81920147c400c1e45e3ddf09155a'}
}

// upgarde logged in user to premium account



// you can call this function anything


// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}


function PayStack ({userEmail, id, amount, premium}) {
  const [approved, setApproved] = useState(false)
  const [upgradeToPremium, setUpgradeToPremium] = useState(false)
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    if(reference.status === 'success')
  {
    setApproved(true)
  }};
    const initializePayment = usePaystackPayment(config(userEmail, amount,id));
   
  

      const upgradeFunc= async() => {
        setUpgradeToPremium(false)
        try {
          const upgradeUser = await axios.put("api/coupon/upgradeToPremium", {
            withCredentials: true
          })
          if(upgradeUser.status === 200){
            alert("user successfully upgraded to premium")
          }
        } catch (error) {
          if(error.response){
            alert(error.response.message)
          } else{
            alert(error.message)
          }
        }
        
        }

  if(approved) {
    deleteCoupon(id)
  }
  const deleteCoupon = async(id) => {
     
    try {
      const response = await  axios.delete(`http://localhost:5000/api/coupon/purchase/${id}`,{
        withCredentials:true
      })
        if(response){
          setApproved(false)
        }
      if(response.status === 200) {
          alert(response.data.message)
          window.location.reload()
         
        }
    } catch (error) {
      console.log("this is the error", error)
      setApproved(false)
  
      if(error.response) {
     alert(error.response.data.message)
      } else{
        alert(error.message)
        console.log("error: " + error.message)
      }
  
    }
    }
  if(premium){
    setUpgradeToPremium(true)
  }
 if(upgradeToPremium){
        upgradeFunc()   
 }
    return (
      <div>
          <Button onClick={ premium ? null : 
          async() => {
            initializePayment(onSuccess, onClose)
           }
          } className="text-light ">{
            premium ? "Migrate To Premium" : "Purchase With Coupon"
          }</Button>
      </div>
    );
};

export default PayStack;
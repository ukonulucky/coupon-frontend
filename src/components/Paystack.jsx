import React from 'react';
import { usePaystackPayment } from 'react-paystack';


const config = (userEmail) => {
    return {
        reference: (new Date()).getTime().toString(),
        email:userEmail,
        amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_8b8bfac8965a81920147c400c1e45e3ddf09155a',
        
    };
}

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

function PayStack ({userEmail}) {
    const initializePayment = usePaystackPayment(config(userEmail));
    return (
      <div>
          <span onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Migrate To Premium</span>
      </div>
    );
};

export default PayStack;
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';


const App = () => {


  const baseURL = "https://sleepy-gorge-94512.herokuapp.com/coupon/discount"

  const [amount, setAmount] = useState(3000)
  const [coupon, setCoupon] = useState(null)

  const [discount, setDiscount] = useState(0)
  const [valid, setValid] = useState(false)

  const handleChange = (e) => {
    const val = e.target.value
    setAmount(val)
  }

  const handleClick = (coupon) => {
    setCoupon(coupon)
  }

  useEffect(() => {
    axios.post(baseURL, {
      totalAmount: amount,
      couponCode: coupon
    })
      .then((response) => {
        console.log(response.data, "output")
        setValid(response.data.valid)

        setDiscount(response.data.discount || 0)

      }).catch((error) => {
        console.log(error)
      })

  }, [amount, coupon])


  return (
    <div className="App">

      <h2>Enter Total Amount</h2>
      <input
        type="number"
        onChange={(e) => handleChange(e)}
        value={amount}
      />
      <br />
      <br />
      <h3>Apply Coupons Here..</h3>

      <button onClick={(e) => handleClick("ZOM60")} type="button" className="btn btn-danger btn-space" href="#">ZOM60</button>

      <button onClick={(e) => handleClick("SWI40")} type="button" className="btn btn-primary btn-space">SWI40</button>

      <button onClick={(e) => handleClick("FRI50")} type="button" className="btn btn-warning btn-space">FRI50</button>

      <button onClick={(e) => handleClick("AMZ40")} type="button" className="btn btn-dark btn-space">AMZ40</button>
      <br />
      <br />

      <h3>Selected Coupon: {coupon}</h3>
      <h3>Total discounted amount: {amount - discount}</h3>
      
      <h4>{valid ? "valid": "invalid"}</h4>


    </div>
  );
}

export default App

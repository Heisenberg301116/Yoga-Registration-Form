import React, { useState } from "react";
import "../styles/Form.css";

function Register(props) {
  const [batch, setBatch] = useState('')
  const [isclicked, setIsclicked] = useState(false);
  const auth_token = props.auth_token
  const register_id = props.register_id

  const CompletePayment = async () => {
    if (batch === "") {
      throw { 'val': [{ 'msg': "Please select the batch first" }] };
    }
    else {
      setIsclicked(true)
    }
  }

  const Register_user = async () => {
    try {
      const pay = await CompletePayment()

      // Register for the time slot
      const url = `https://yoga-registration-form-production.up.railway.app/Register_User/${register_id}`

      const response = await fetch(url, {
        method: "put",
        headers: { "auth_token": auth_token, "Content-Type": "application/json" },
        body: JSON.stringify({ batch: batch })
      })

      if (!response.ok) {
        throw await response.json() // this will parse the JSON response body
      }
      else {
        const data = await response.json()
        const framed_message = { 'status': 200, 'msg': data.val }
        props.handle_outcome(framed_message)
      }
    }
    catch (error) {
      const error_array = error.val
      for (let i = 0; i < error_array.length; i++) {
        const framed_message = { 'status': 400, 'msg': error_array[i].msg }
        props.handle_outcome(framed_message)
      }
      setIsclicked(false)
    }
  }

  return (
    <>
      <div style={{ topMargin: "30px", bottomMargin: "30px" }}>
        <h1 style={{
          textAlign: 'center',
          color: 'blue',
          textDecoration: 'underline',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          Registration
        </h1>

        <div className="formContainer" style={{ backgroundColor: 'silver', borderWidth: '3px', borderRadius: '1%', width: '40%', padding: '6%', fontSize: 'larger' }}>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
            <input
              type="radio"
              disabled={isclicked}
              id="first"
              name="batchNo"
              value="1"
              onChange={(e) => setBatch("6 AM - 7 AM")}
              style={{ marginRight: '15px' }}
            />
            <label for="first"
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                color: 'navy',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}>
              6 AM - 7 AM
            </label >
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
            <input
              type="radio"
              disabled={isclicked}
              id="second"
              name="batchNo"
              value="1"
              onChange={(e) => setBatch("7 AM - 8 AM")}
              style={{ marginRight: '15px' }}
            />
            <label for="second"
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                color: 'navy',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}>
              7 AM - 8 AM
            </label >
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
            <input
              type="radio"
              disabled={isclicked}
              id="third"
              name="batchNo"
              value="1"
              onChange={(e) => setBatch("8 AM - 9 AM")}
              style={{ marginRight: '15px' }}
            />
            <label for="third"
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                color: 'navy',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}>
              8 AM - 9 AM
            </label >
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
            <input
              type="radio"
              disabled={isclicked}
              id="fourth"
              name="batchNo"
              value="1"
              onChange={(e) => setBatch("5 PM - 6 PM")}
              style={{ marginRight: '15px' }}
            />
            <label for="fourth"
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                color: 'navy',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}>
              5 PM - 6 PM
            </label >
          </div>

          <button className="toPayment" style={{ border: '3px solid black', marginTop: '30px', marginBottom: '7px', width: '200px', height: '70px', backgroundColor: 'white' }} onClick={Register_user} disabled={isclicked}><h5>Pay enrollment fee Rs 500</h5></button>

        </div>
      </div>
    </>
  );
}

export default Register;
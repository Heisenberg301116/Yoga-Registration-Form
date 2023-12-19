import React, { useState } from "react";
import "../styles/Form.css";

function Login(props) {
  const [email, setEmail] = useState("");

  const SaveData = async () => {
    try {
      // Perform user login by calling the REST API
      const response = await fetch("http://localhost:5000/Login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, })
      })

      if (!response.ok) {
        throw await response.json() // this will parse the JSON response body
      }
      else {
        const data = await response.json()
        const framed_message = { 'status': 200, 'auth_token': data.val.auth_token, 'register_id': data.val.register_id }
        props.handle_outcome(framed_message)
      }
    }
    catch (error) {
      const error_array = error.val
      if (error_array[0].msg === "Profile does not exist !") {
        props.set_App_Email(email)
        const framed_message = { 'status': 401, 'msg': error_array[0].msg }
        props.handle_outcome(framed_message)
      }
      else {
        const framed_message = { 'status': 400, 'msg': error_array[0].msg }
        props.handle_outcome(framed_message)
      }
    }
  }


  const handleEmailChange = (b) => {
    setEmail(b);
  };

  return (
    <>
      <div>
        <h1 style={{
          textAlign: 'center',
          color: 'blue',
          textDecoration: 'underline',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          Login Portal
        </h1>

        <div className="formContainer" style={{ backgroundColor: 'silver', borderWidth: '3px', borderRadius: '1%', width: '40%', padding: '2%', fontSize: 'larger', }}>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px', marginRight: '20px' }}>Email</span>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              style={{ marginRight: '5px' }} // Optional: Adjust margin between input and span
            />
          </div>


          <button className="toPayment" style={{ border: '3px solid black', marginTop: '30px', marginBottom: '7px' }} onClick={SaveData}><h5>Continue</h5></button>

        </div>
      </div>
    </>
  );
}

export default Login;
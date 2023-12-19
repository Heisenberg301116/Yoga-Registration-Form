import React, { useState } from "react";
import "../styles/Form.css";

function Create_Account(props) {
  const [email, set_Email] = useState(props.email);
  const [name, set_Name] = useState("");
  const [password, set_Password] = useState("");
  const [date_of_birth, set_Date_of_birth] = useState("");

  const SaveData = async () => {
    try {
      // Perform user login by calling the REST API
      const elements = date_of_birth.split("-")
      const modified_dob = elements[0] + "-" + elements[1] + "-" + elements[2]

      const response = await fetch("https://yoga-registration-form-production.up.railway.app/Create_Account", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: name, password: password, date_of_birth: modified_dob })
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
      for (let i = 0; i < error_array.length; i++) {
        const framed_message = { 'status': 400, 'msg': error_array[i].msg }
        props.handle_outcome(framed_message)
      }
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
          Create your Account
        </h1>

        <div className="formContainer" style={{ backgroundColor: 'silver', borderWidth: '3px', borderRadius: '1%', width: '40%', padding: '6%', fontSize: 'larger' }}>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
            <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px', marginRight: '20px' }}>Email</span>
            <input
              type="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => { set_Email(e.target.value) }}
              style={{ marginLeft: '10px', width: '200px' }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px', marginLeft: '10px', marginRight: '20px' }}>
            <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px' }}>Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => { set_Name(e.target.value) }}
              style={{ marginLeft: '20px', width: '200px' }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px', marginLeft: '20px' }}>
            <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px' }}>Password</span>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => { set_Password(e.target.value) }}
              style={{ marginLeft: '20px', width: '200px' }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: '20px', marginLeft: '0px' }}>
            <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px' }}>Date of birth</span>
            <input
              type="date"
              placeholder="Enter your DOB"
              value={date_of_birth}
              onChange={(e) => { set_Date_of_birth(e.target.value) }}
              style={{ marginLeft: '20px', width: '200px' }} />
          </div>

          <button className="toPayment" style={{ border: '3px solid black', marginTop: '30px', marginBottom: '7px' }} onClick={SaveData}><h5>Continue</h5></button>

        </div>
      </div>
    </>
  );
}

export default Create_Account;
import React, { useState } from "react";
import "../styles/Form.css";

function Login(props) {
    const [password, setPassword] = useState("");

    const SaveData = async () => {
        try {
            // Perform user authentication by calling the REST API

            const url = "https://yoga-registration-form-production.up.railway.app/Authenticate_User"
            // const url = "http://localhost:5000/Authenticate_User"

            const response = await fetch(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: props.email, password: password })
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
            if (error_array[0].msg === "Wrong Password !") {
                const framed_message = { 'status': 401, 'msg': "Wrong Password !" }
                props.handle_outcome(framed_message)
            }
            else {
                const framed_message = { 'status': 400, 'msg': error_array[0].msg }
                props.handle_outcome(framed_message)
            }
        }
    }


    const handlePasswordChange = (b) => {
        setPassword(b);
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
                    Authentication: Enter your password
                </h1>

                <div className="formContainer" style={{ backgroundColor: 'silver', borderWidth: '3px', borderRadius: '1%', width: '40%', padding: '2%', fontSize: 'larger', }}>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ border: '1px solid black', padding: '5px', borderRadius: '5px', marginRight: '20px' }}>Password</span>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            style={{ marginRight: '5px', width: '100%' }} // Optional: Adjust margin between input and span
                        />
                    </div>


                    <button className="toPayment" style={{ border: '3px solid black', marginTop: '30px', marginBottom: '7px' }} onClick={SaveData}><h5>Continue</h5></button>

                </div>
            </div>
        </>
    );
}

export default Login;
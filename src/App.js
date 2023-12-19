import './App.css';
import Login from './components/Login'
import Create_Account from './components/Create Account'
import Registration from './components/Registration'
import Alert from './components/Alert';
import React, { useState } from "react";

function App() {
  const [step, set_Step] = useState(1)
  const [auth_token, set_Auth_token] = useState('')
  const [register_id, set_Register_id] = useState('')
  const [email, set_Email] = useState('')
  const [alert, set_Alert] = useState(null)

  const Show_Alert = (type, message) => {
    set_Alert({
      message: message,
      type: type
    })

    setTimeout(() => {    // After 2s, the alert popup will vanish 
      set_Alert(null)
    }, 4000)
  }

  const Handle_Login_Outcome = (val) => {
    if (val.status === 200) {
      set_Auth_token(val.auth_token)
      set_Register_id(val.register_id)
      set_Step(3)
      Show_Alert("success", "Login Successful !")
    }
    else if (val.status === 401) {     // email is not registered
      Show_Alert("danger", val.msg)
      set_Step(2)
    }
    else {     // email id is not valid
      Show_Alert("danger", val.msg)
    }
  }

  const Handle_Create_Account_Outcome = (val) => {
    if (val.status === 200) {
      set_Auth_token(val.auth_token)
      set_Register_id(val.register_id)
      set_Step(3)
      Show_Alert("success", "Successfully created new account !")
    }
    else {
      Show_Alert("danger", val.msg)
    }
  }

  const Handle_Registration_Outcome = (val) => {
    if (val.status === 200) {   // Success
      Show_Alert("success", val.msg)
    }
    else {
      Show_Alert("danger", val.msg)      // Error
    }
  }

  return (
    <div className="App" >
      <div className="company-header">
        <h1 style={{
          textAlign: 'center',
          fontSize: '3.0rem',
          color: 'rgb(255,1,25)', // Your desired text color
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          margin: '20px 0'
        }}>
          Yoga Classes
        </h1>
      </div>
      <Alert obj={alert} />
      {step === 1 && <Login set_App_Email={set_Email} handle_outcome={Handle_Login_Outcome} />}
      {step === 2 && <Create_Account email={email} handle_outcome={Handle_Create_Account_Outcome} />}
      {step === 3 && <Registration register_id={register_id} auth_token={auth_token} handle_outcome={Handle_Registration_Outcome} />}
    </div>
  );
}


export default App;
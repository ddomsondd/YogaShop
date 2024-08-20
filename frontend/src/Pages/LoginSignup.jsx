import React, {useState} from 'react'
import './CSS/Login.css'

const Login = () => {
  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    name:"",
    password:"",
    email:""
  })
  const [errors, setErrors] = useState([]);
  const validateFormData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]+$/;
    const errors = [];

    if (!emailRegex.test(formData.email)) {
        errors.push("Invalid email format.");
    }
    if (state === "Sign Up" && !nameRegex.test(formData.name)) {
        errors.push("Name can only contain letters.");
    }
    if (formData.password.length < 4) {
        errors.push("Password must be at least 4 characters long.");
    }

    return errors;
  };
  
  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () =>{
    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
        setErrors(validationErrors);
      return;
    }
    
    console.log("Login Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert("Something went wrong :(");
    }
  }

  const signup = async () =>{
    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Sign Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert("Something went wrong :(");
    }
  }

  return (
    <div className='loginSignup'>
        <div className='banner'>
            <h1>{state}</h1>
       </div>
        <div className="loginsignup-container">            
            <div className='loginsignup-fields'>
                {state==="Sign Up"?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your name'/>:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
                <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>    
            </div>
            {errors.length > 0 && (
              <div className="errors">
                {errors.map((error, index) => <p key={index} className="error-message">{error}</p>)}
              </div>
            )}
            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
            {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
            {state==="Sign Up"?<div className="loginsignup-agree">
                <input type="checkbox" name='' id=''/>
                <p>I agree to the terms of use & policy</p>
                </div>:<></>
            }
             </div>
        
    </div>
  )
}

export default Login

import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const navigate= useNavigate()
    
   const fetchUser= async()=>{
    try {
       const formData={
           email,password
        }
        const config={
            headers:{
                "Content-Type": "application/json"
            }
        }
        const response= await axios.post("http://localhost:5000/login",formData,config)
        console.log(response.data)
        localStorage.setItem("token",response.data.token)
        toast.success("Login successful")
        navigate("/home")
    } catch (error) {
          toast.error(error.response?.data?.message || "Login Failed")
       
        console.error("error during login")
    }
   }
   const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!email || !password){
       return toast.error("Please fill all input")
    }
    await fetchUser()  
   }
    return (
        <div className='Signup-div'>
            <form onSubmit={handleSubmit} className="form" style={{margin:"auto",marginTop:"50px"}}>
                <h3 style={{textAlign:"center"}}>User Login Form</h3>
                <label>Email:</label>
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                />

                <label>Password:</label>
                <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                />

                <button type="submit">Submit</button>

                  <div style={{marginTop:"10px"}}>
                Don't have an account? <span onClick={()=>navigate("/signup")} style={{color:"blue"}}>Signup </span>
                
            </div>
            </form>
          
        </div>
    )
}

export default Login



// const fetchUser = async () => {
//   try {
//     const response = await axios.post("http://localhost:5000/signup", {
//       name,
//       email,
//       password,
//     });

//     toast.success("Signup successful ");
//     return true;
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Signup failed ");
//     return false; // 
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!name || !email || !password) {
//     return toast.error("Please fill all input");
//   }

//   const isSuccess = await fetchUser(); 

//   if (isSuccess) {
//     navigate("/login"); 
//   }
// };
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const formData = {
                name, email, password
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                   
                }
            }
            const response = await axios.post("http://localhost:5000/signup", formData, config)
            toast.success("Signup successfully");
            return true;
            console.log(response.data)

        } catch (error) {
           toast.error(error.response?.data?.message  || "Signup failed ")
           return false
            console.error("Error during Signup")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
         return toast.error("Please fill all input");
        }
       const isSuccess= await fetchUser()
       if(isSuccess){
        navigate("/login")
       }
    }
    return (
        <div className='Signup-div'>
            <form onSubmit={handleSubmit} className="form" style={{ margin: "auto", marginTop: "50px" }}>
                <h3 style={{ textAlign: "center" }}>User Signup Form</h3>
                <label>Name:</label>
                <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name..."
                />
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

                <div style={{ marginTop: "10px" }}>
                    Already have an account? <span onClick={() => navigate("/login")} style={{ color: "blue" }}>Login </span>

                </div>
            </form>

        </div>
    )
}

export default Signup

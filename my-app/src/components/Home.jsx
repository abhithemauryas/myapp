import React, { useState } from 'react'
import axios from 'axios'
import Card from './Card'
import LogoutButton from './LogoutButton'
import toast from 'react-hot-toast'

const Home = () => {
    const [name, setName] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [refresh, setRefresh] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name || !lastName || !email || !number){
            toast.error("Please fill all input")
            return         
        }
        const formdata = {
            firstName: name,
            lastName: lastName,
            email: email,
            mobileNumber: number
        }
        try {
          const token = localStorage.getItem("token");
           if(!token){
           console.log("No Token, user is not logged in ")
     }
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
            await axios.post('http://localhost:5000/user/data', formdata, config)
            setRefresh(prev => !prev)
            toast.success("User data post Successfully")
            setName("")
            setLastname("")
            setEmail("")
            setNumber("")
        
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
          <div className='logOut-button-div'><LogoutButton/></div>
            <div className="form-container">
              
                <form onSubmit={handleSubmit} className="form">
                    <h3 style={{textAlign:"center"}}>Post Your Data</h3>

                    <label>First Name:</label>
                    <input 
                        type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your first name"
                    />

                    <label>Last Name:</label>
                    <input 
                        type="text" value={lastName} onChange={(e) => setLastname(e.target.value)}
                        placeholder="Enter last name"
                    />

                    <label>Email:</label>
                    <input 
                        type="email"value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    <label>Number:</label>
                    <input 
                        type="number"value={number} onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter your number..."
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <h2 style={{ textAlign: "center" }}>Your Data</h2>
            </div>

            <div className="card-container">
               <Card refresh={refresh} />
            </div>
        </>
    )
}

export default Home
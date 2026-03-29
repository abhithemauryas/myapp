// import React, { useState } from 'react'
// import axios from 'axios'
// import Card from './Card'

// const User = () => {
//     const [name, setName] = useState("")
//     const [lastName, setLastname] = useState("")
//     const [email, setEmail] = useState("")
//     const [number, setNumber] = useState("")
//     const [refresh, setRefresh] = useState(false)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if(!name || !lastName || !email || !number){
//             alert("Please fill all input")
//             return         
//         }
//         const formdata = {
//             firstName: name,
//             lastName: lastName,
//             email: email,
//             mobileNumber: number
//         }

//         try {
//             await axios.post('http://localhost:5000/user', formdata)

//             setRefresh(prev => !prev)
//             alert("User Registered Successfully")
//             setName("")
//             setLastname("")
//             setEmail("")
//             setNumber("")
        
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     return (
//         <>
//             <div className="form-container">
//                 <form onSubmit={handleSubmit} className="form">
//                     <h3>User Register Form</h3>

//                     <label>First Name:</label>
//                     <input 
//                         type="text" value={name} onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter your first name"
//                     />

//                     <label>Last Name:</label>
//                     <input 
//                         type="text" value={lastName} onChange={(e) => setLastname(e.target.value)}
//                         placeholder="Enter last name"
//                     />

//                     <label>Email:</label>
//                     <input 
//                         type="email"value={email} onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                     />

//                     <label>Number:</label>
//                     <input 
//                         type="number"value={number} onChange={(e) => setNumber(e.target.value)}
//                         placeholder="Enter your number..."
//                     />

//                     <button type="submit">Submit</button>
//                 </form>
//             </div>

//             <div>
//                 <h2 style={{ textAlign: "center" }}>User Data</h2>
//             </div>

//             <div className="card-container">
//                <Card refresh={refresh} />
//             </div>
//         </>
//     )
// }

// export default User
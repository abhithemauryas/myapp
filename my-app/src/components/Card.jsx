import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Swal from "sweetalert2";


const Card = ({ refresh }) => {
    const [data, setData] = useState([])
    const [editUser, setEditUser] = useState(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: ""
    })
    const token = localStorage.getItem("token")
    if (!token) {
        console.log("No Token, user is not logged in ")
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const fetchUser = async () => {
        const res = await axios.get("http://localhost:5000/user/data", config)
        console.log("resssssssssss", res)
        setData(res?.data?.data)
        console.log(res.data)
    }

    const deleteUser = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e3342f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
        await axios.delete(`http://localhost:5000/user/${id}`);

        // success popup
        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User has been deleted.",
            timer: 1500,
            showConfirmButton: false,
        });

        fetchUser();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete user.",
        });
    }
};

    const handleEdit = (user) => {
        setEditUser(user.id)
        setFormData(user)
    }
    const cancelHandle=()=>{
        setEditUser(null)
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const updateUser = async () => {
        await axios.put(`http://localhost:5000/user/${editUser}`, formData)
         toast.success("Update Successfully")
        setEditUser(null)
        fetchUser()
    }

    useEffect(() => {
        if (token) {
            fetchUser()
        }

    }, [refresh])

    return (
        <>
            {data?.length === 0 ? (<h1>No Data Found</h1>) : (
                data?.length && data.map((user) => (
                    <div className='div-box' key={user.id}>
                        <div className='div-button'>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                        </div>
                        {editUser === user.id ? (
                            <div><label htmlFor="">First name:</label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} /><br />
                                <label htmlFor="">Last Name:</label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} /> <br />
                                <label htmlFor="">Email:</label>
                                <input name="email" value={formData.email} onChange={handleChange} />  <br />
                                <label htmlFor="">Number:</label>
                                <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                                <button onClick={updateUser}>Save</button>
                                <button onClick={cancelHandle}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p>First Name: {user?.firstName}</p>
                                <p>Last Name: {user?.lastName}</p>
                                <p>Email: {user?.email}</p>
                                <p>Number: {user?.mobileNumber}</p>
                            </>
                        )}
                    </div>
                ))
            )
            }
        </>
    )
}

export default Card
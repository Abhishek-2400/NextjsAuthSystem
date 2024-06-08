"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'


const page = () => {
    const router = useRouter()
    const handlelogout = async () => {
        try {
            const response = await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            console.log("logged out successfully", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("logut failed", error.message);
        }

    }

    const [userData, setUserData] = useState("Nothing")
    const getMyDetails = async () => {

        try {
            const response = await axios.get('/api/users/userinfo');
            console.log("fetched data sucessfully", response.data);
            setUserData(response.data.data._id)
        } catch (error: any) {
            console.log("unable to fetch user details", error.message);
        }
    }
    return (
        <>
            <div>
                Profile
            </div>

            {userData === "Nothing" ? <button>Nothing!</button> : <Link href={`/profile/${userData}`}><button>{userData}</button></Link>}
            <br></br>
            <button onClick={() => { getMyDetails() }}>Extract my details</button>
            <br></br>
            <br></br>
            <button onClick={() => { handlelogout() }}>Logout</button>
        </>
    )
}

export default page

"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
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
    return (
        <>
            <div>
                Profile
            </div>
            <button onClick={() => { handlelogout() }}>Logout</button>
        </>
    )
}

export default page

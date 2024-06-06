"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const [payload, setpayload] = useState({
        "email": "",
        "password": ""
    })

    const OnChangeHandler = (e: any) => {
        setpayload({ ...payload, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/login', payload)
            console.log("successful login", response.data)
            router.push("/profile")
        } catch (error: any) {
            console.log("login failed", error.message)
        }
    }

    return (
        <form onSubmit={handlesubmit}>
            <h1>Login</h1>
            <div className="email">
                <label htmlFor='email'>Email:</label>
                <input type="email" id="email" name="email" required value={payload.email} onChange={(e) => { OnChangeHandler(e) }} />
            </div>
            <div className="password">
                <label htmlFor='password'>Password:</label>
                <input type="password" id="password" name="password" required value={payload.password} onChange={(e) => { OnChangeHandler(e) }} />
            </div>
            <div className="submit">
                <button type="submit">Login</button>
            </div>
            <Link href='/signup'>Signup</Link>
        </form>
    )
}

export default page

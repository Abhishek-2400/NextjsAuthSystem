"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const signup = () => {
    const router = useRouter()
    const [payload, setpayload] = useState({
        "email": "",
        "username": "",
        "password": ""
    })

    const OnChangeHandler = (e: any) => {
        setpayload({ ...payload, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post("/api/users/signup", payload);
            console.log("signup success", response.data)
            router.push("/login")
        }
        catch (error: any) {
            console.log("signup failed", error.message)
        }


    }
    return (

        <form onSubmit={handlesubmit}>
            <h1>Signup</h1>
            <div className="username">
                <label htmlFor='username'>Username:</label>
                <input type="text" id="username" name="username" required value={payload.username} onChange={(e) => { OnChangeHandler(e) }} />
            </div>
            <div className="email">
                <label htmlFor='email'>Email:</label>
                <input type="email" id="email" name="email" required value={payload.email} onChange={(e) => { OnChangeHandler(e) }} />
            </div>
            <div className="password">
                <label htmlFor='password'>Password:</label>
                <input type="password" id="password" name="password" required value={payload.password} onChange={(e) => { OnChangeHandler(e) }} />
            </div>
            <div className="submit">
                <button type="submit">Signup</button>
            </div>
            <Link href='/login'>Login</Link>
        </form>

    )
}

export default signup

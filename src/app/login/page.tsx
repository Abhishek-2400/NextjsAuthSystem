"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {

    const [payload, setpayload] = useState({
        "email": "",
        "password": ""
    })

    const OnChangeHandler = (e) => {
        console.log(payload)
        setpayload({ ...payload, [e.target.name]: e.target.value })
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(payload);
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

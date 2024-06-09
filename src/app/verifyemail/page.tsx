"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
const page = () => {
    const [token, setToken] = useState("");
    const [verify, setVerify] = useState(false);
    const verifyToken = async () => {
        try {
            //console.log(token)
            const response = await axios.post('/api/users/verifymail', { token });
            console.log(response.data, "successfuly verified email")
            setVerify(true);
        } catch (error: any) {
            console.log("unable to verify email", error.message)
        }

    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let tokens = params.get('token');
        console.log(tokens)
        if (!tokens) tokens = "";// Assuming the parameter is named 'id'
        setToken(tokens);
        console.log(token)
    }, [])

    useEffect(() => {
        verifyToken();
    }, [token])


    return (
        <div>
            {
                verify ?
                    <>
                        <p>User verified {token}</p>
                        <Link href='/login'><button>Login to your account</button></Link>
                    </>
                    :
                    <>
                        <p>User not verfied </p>
                    </>

            }
        </div>
    )
}

export default page

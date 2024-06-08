import React from 'react'
import axios from 'axios'

const page = ({ params }: any) => {

    return (
        <div>

            <p>{params.id}</p>
        </div>
    )
}

export default page

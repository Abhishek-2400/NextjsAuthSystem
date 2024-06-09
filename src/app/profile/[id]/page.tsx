import React from 'react'
import axios from 'axios'

const PrivateProfilepage = ({ params }: any) => {

    return (
        <div>

            <p>{params.id}</p>
        </div>
    )
}

export default PrivateProfilepage

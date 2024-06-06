import React from 'react'

const page = ({ params }: any) => {
    return (
        <div>
            <p>{params.id}</p>
        </div>
    )
}

export default page

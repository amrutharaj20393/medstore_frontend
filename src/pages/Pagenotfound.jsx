import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-3'>
                    <div>1</div>
                    <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                        <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?semt=ais_hybrid&w=740" alt="page not found" />
                        <Link to={'/'}><button className='mt-4 px-4 py-3 text-white bg-cyan-950 hover:border hover:border-cyan-950 hover:text-cyan-900 hover:bg-white rounded'>Back Home</button></Link>
                    </div>
                    <div>3</div>
                </div>
            </div>
         
        </>
    )
}

export default Pagenotfound
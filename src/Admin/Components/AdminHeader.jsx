import React,{useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {
  const [token, setToken] = useState("")
    const navigate = useNavigate()
     const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        setToken("")
        navigate('/')
      }
      useEffect(() => {
        const token = sessionStorage.getItem("token")
        setToken(token)
        
      }, [token])
  return (
    <>
     <div className='md:flex justify-between flex   md:px-20 md:p-3 p-2'>
                <div className='flex items-center'>
                <img src="https://c8.alamy.com/comp/2P90TY1/medical-shop-pharmacy-icon-vector-graphics-for-various-use-2P90TY1.jpg" alt="" style={{width:'50px',height:'50px'}}/>
                    <h1 className='text-2xl font-bold text-cyan-700  ms-2'>Admin Panel</h1>
                </div>

<button type='button' onClick={handleLogout} className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='md:me-3' />Logout</button>
            </div>
            <div className='bg-gray-400 text-white h-10 justify-center items-center'>

</div>

    </>
  )
}

export default AdminHeader
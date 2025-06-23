import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Adminsidebar() {
const[status,setStatus]=useState(false)
 const [token, setToken] = useState("")
    const navigate = useNavigate()
    const filter = (data) => {
        if (data == 'home') {
            navigate('/admin-home')
        }
        else if (data == 'products') {
            navigate('/admin-products')
        }
        else if (data == 'orders') {
            navigate('/admin-orders')
        }
        else if (data == 'users') {
            navigate('/admin-users')
        }
        else {
            navigate('*')
        }

    }
       const [userdt, setUserdt] = useState({
        username: ""
    })
    useEffect(()=>{
          if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserdt({ username: user.username})

        }

    },[])


    return (
        <>
        <div className='flex justify-center items-center flex-col'>
        <img className='md:mt-3 mt-5  ' src="https://cdn-icons-png.flaticon.com/512/3686/3686930.png" alt="" style={{ width: '150px', height: '150px' }} />
        <h1 className='mt-4 text-center'>{userdt.username}</h1>
        </div>
        
            <div className='flex justify-center items-center px-3 md:hidden'>
            
                <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>
            </div>
        <div className={status ? 'md:block md:my-3 w-full' : 'md:block justify-center my-3 hidden w-full'}>
        <div className=' w-full'>
                <button onClick={() => filter('home')} className='bg-blue-800 text-white  mt-10 p-2  hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>DashBoard </button>
            </div>
            <div className=' w-full'>
                <button onClick={() => filter('products')} className='bg-blue-800 text-white  p-2  hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Products </button>
            </div>
            <div className=' w-full'>
                <button onClick={() => filter('orders')} className='bg-blue-800 text-white p-2   hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Orders </button>
            </div>
            <div className=' w-full'>
                <button onClick={() => filter('users')} className='bg-blue-800 text-white  p-2 hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Users </button>
            </div>
        </div>
            

        </>
    )
}

export default Adminsidebar
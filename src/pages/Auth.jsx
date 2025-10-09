import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { GoogleloginApi, loginApi, registerApi } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Auth({ register }) {
  const [showpassword, setShowpassword] = useState(false)
  const [userdetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  //to register a user
  const handleRegister = async () => {
    const { username, email, password } = userdetails
    if (!username || !email || !password) {
      toast.info("please fill all details")
    }
    else {

      const result = await registerApi({ username, email, password })
      ///console.log(result)
      if (result.status == 200) {
        toast.success("User Registered Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 400) {

        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error("something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }

  }
  const handleLogin = async () => {
    const { email, password } = userdetails
    if (!email || !password) {
      toast.info("please fill all details")
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result)
      if (result.status == 200) {
        toast.success("User Login Successfully")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token", result.data.token)
        setTimeout(() => {
          if (result.data.existinguser.email == "admin@gmail.com") {
            navigate('/admin-home')
          }
          else {
            navigate('/')
          }

        }, 2500)

        setUserDetails({
          username: "",
          email: "",
          password: ""
        })

      }
      else if (result.status == 404) {

        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error("something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  const handelGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    // console.log(details)
    const result = await GoogleloginApi({ username: details.name, email: details.email, password: 'googlepassword' })
    //console.log(result)
    if (result.status == 200) {
      toast.success("Login Successfully")
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existinguser))
      sessionStorage.setItem("token", result.data.token)
      setTimeout(() => {
        if (result.data.existinguser.email == "admin@gmail.com") {
          navigate('/admin-home')
        }
        else {
          navigate('/')
        }

      }, 2500)


    }
    else {
      toast.error("something went wrong")
    }

  }
  return (
    <>

      <section className=' md:p-10 md:px-40 px-5'>
        <div className='md:grid grid-cols-2 w-full md:border md:shadow md:rounded border-gray-200'>
          <div className='md:flex justify-center items-center w-full ' >
            <h1 className='text-white text-3xl md:mt-8'>Sign In</h1>
            <div className='flex justify-center items-center  w-full' >

              <form className='w-full bg-cyan-900 md:p-5 px-5 mt-5 mb-5 flex justify-center rounded items-center flex-col' action="">

                <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-amber-50'>
                  <FontAwesomeIcon icon={faUser} className='text-white ms-5 mt-4 fa-2x' />
                </div>
                {!register ? <h1 className='text-white text-3xl mb-8'>Sign In</h1> :
                  <h1 className='text-white text-3xl mb-8'>Register</h1>}

                {register && <div className='mb-5 w-full mt-8'>
                  <input value={userdetails.username} onChange={(e) => setUserDetails({ ...userdetails, username: e.target.value })} type="text" placeholder='Username' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
                </div>}

                <div className='mb-5 w-full '>
                  <input value={userdetails.email} onChange={(e) => setUserDetails({ ...userdetails, email: e.target.value })} type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
                </div>

                <div className='mb-2 w-full flex bg-white rounded '>
                  {/* { <input value={userdetails.password} 
                  onChange={(e) => setUserDetails({ ...userdetails, password: e.target.value })} type="text" placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />} */}
                  <input value={userdetails.password} type={showpassword ? "text" : "password"} placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' onChange={(e) => setUserDetails({ ...userdetails, password: e.target.value })} />

                  {!showpassword ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowpassword(true)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2' /> : <FontAwesomeIcon icon={faEye} onClick={() => setShowpassword(false)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2' />}
                </div>

                <div className='mb-5 w-full flex justify-between '>
                  <p className='text-amber-400 ' style={{ fontSize: '10px' }}>"Never share password with others"</p>

                  {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forgot password</p>}
                </div>


                {register ? <div className='w-full mb-2'>
                  <button type="button" onClick={handleRegister} className='bg-green-800 text-white w-full p-3 rounded'>Register</button>
                </div> :
                  <div className='w-full mb-2'>
                    <button type="button" onClick={handleLogin} className='bg-green-800 text-white w-full p-3 rounded'>Login</button>
                  </div>}
                <p className='text-white'>----------------or-------------</p>

                {!register && <div className='md:flex mb-2 mt-3 w-full justify-center items-center'>
                  { /* <button className='bg-white text-black w-full p-3 rounded'>Sign In with Google</button>*/}
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse)
                      handelGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}
                  />;
                </div>}

                {register ? <p className='text-white'>Are you a already a user?<Link to={'/login'} className='text-blue-500 ms-2 underline'>Login</Link> </p> :
                  <p className='text-white'>Are you a new  user?<Link to={'/register'} className='text-blue-500 ms-2 underline'>Register</Link> </p>}

              </form>
            </div>
          </div>
          <div className='md:flex justify-center rounded items-center  p-2 w-full'>
            <div className='w-full'>
              <img src="https://cdn.dribbble.com/userupload/4839030/file/original-7ed0497dd7570a7c8488ef649e46a1ae.png?resize=1504x1128&vertical=center" alt="" />
            </div>

          </div>
        </div>
      </section>


      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default Auth
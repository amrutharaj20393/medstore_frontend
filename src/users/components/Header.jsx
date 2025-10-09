import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { cartMedDetContext, cartStatusContext, searchKeyContext } from '../../Context/Contextshare'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify/unstyled'
import { GetCartMedicineApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
function Header() {
  const [status, setStatus] = useState(false)
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const { searchKey, setSearchKey } = useContext(searchKeyContext)
  const { cartmedDet, setCartMedDt } = useContext(cartMedDetContext)
  const { cartStatus } = useContext(cartStatusContext)
  const [existingProfileImage, setExistingProfileImage] = useState("")

  const handlenavigate = () => {
    const token = sessionStorage.getItem("token")
    if (searchKey == "") {
      toast.info("Please enter medicine")
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } else if (!token) {
      toast.info("Please login")
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      navigate('/medicines')
    }
    else if (searchKey && token) {

      navigate('/medicines')
    }

  }
  const handleLogout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setToken("")
    navigate('/')
  }
  ///console.log(token)
  const getCartMedicineDet = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    /// console.log(reqHeader)
    const result = await GetCartMedicineApi(reqHeader)
    //console.log(result)
    if (result.status == 200) {
      setCartMedDt(result.data.cartItems)
    }
    else if (result.status == 401) {
      console.log("no cart data")
      setCartMedDt([])
    }
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      setToken(token)
      setSearchKey("")
    }


  }, [token])
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      getCartMedicineDet(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      //setUserDetails({ username: user.username, password: user.password, cpassword: user.password})
      setExistingProfileImage(user.profile)
    }
  }, [cartStatus])
  return (
    <>
      <div className='grid grid-cols-3 p-3'>
        <div className='flex  items-center'>
          <img src="https://c8.alamy.com/comp/2P90TY1/medical-shop-pharmacy-icon-vector-graphics-for-various-use-2P90TY1.jpg" alt="" style={{ width: '50px', height: '50px' }} />
          <h1 className='text-green-700 font-bold'>NetMeds</h1>
        </div>
        <div className='md:flex justify-center items-center hidden'>
          <input type="text" value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value)

            }} placeholder='search medicine'
            className=' border border-cyan-950 rounded-2xl w-full text-black h-10 me-2 placeholder-cyan-900 placeholder:font-bold
              placeholder:ms-3' />
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-blue-800  fa-2x '
            style={{ marginTop: '11px', marginLeft: '0px' }} onClick={handlenavigate} />
        </div>
        <div className='md:hidden'>


        </div>
        <div className='md:flex justify-end items-center hidden'>
          {token ? <Link to={'/cart'}><FontAwesomeIcon icon={faCartPlus} style={{ color: "#5b12b5" }} className=' fa-3x me-3  ' /><span className=' bg-cyan-500 text-white rounded me-3 py-1 px-2 fa-1x' style={{ marginRight: "50px" }} >{cartmedDet?.length}</span></Link> : <FontAwesomeIcon icon={faCartPlus} style={{ color: "#5b12b5" }} className=' fa-3x  ' />}

          {!token ? <div>

            <Link to={'/login'}><button className='border border-cyan-950 rounded px-3 py-2 bg-cyan-800 text-white ms-3'>Login</button></Link>
          </div>
            : <div className='md:flex justify-center items-center' > <Link to="/profile">
              <button className="mt-5 px-4 py-2 rounded bg-blue-800 text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 transition">
                Go to Profile
              </button>
            </Link>

              <Link to={'/'}>
                <div className='md:flex justify-center items-center border border-black rounded px-2 ms-3'>
                  {existingProfileImage === "" ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3686/3686930.png"
                      alt="profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  ) : (
                    <img
                      src={`${serverUrl}/serverupload/${existingProfileImage}`}
                      alt="profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  )}
                  <button type="button" onClick={handleLogout} className='px-4 py-2  hover:bg-cyan-700 hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='md:me-3' />Logout</button>
                </div>
              </Link>
            </div>

          }
        </div>

      </div>
      <div className='flex justify-center items-center md:hidden '>
        <input type="text" placeholder='search medicine' className='border mt-4 px-3 py-4 border-cyan-950 rounded-2xl w-80 h-10 me-2 placeholder-cyan-900 placeholder:font-bold placeholder:ms-3' /><span><FontAwesomeIcon icon={faMagnifyingGlassPlus} style={{ color: "#5b12b5", }} className='fa-2x mt-4 me-2' /></span>
      </div>
      <nav className='w-full md:p-3 px-2 bg-cyan-900 text-white md:flex justify-center items-center mt-3 md:mt-0'>
        <div className='flex justify-between px-2 py-3 md:hidden'>

          <span ><FontAwesomeIcon onClick={() => { setStatus(!status) }} icon={faBars} className='fa-2x' /></span>

          {token ? <Link to={'/cart'}><FontAwesomeIcon icon={faCartPlus} style={{ color: "#5b12b5" }} className=' fa-3x  ' /><span className=' bg-cyan-500 text-white rounded me-3 py-1 px-2 fa-1x' style={{ marginRight: "50px" }} >{cartmedDet?.length}</span></Link> : <FontAwesomeIcon icon={faCartPlus} style={{ color: "#5b12b5" }} className=' fa-3x  ' />}

          {!token ? <Link to={'/login'}><button className='border border-white rounded px-3 py-2 text-white ms-3 me-3'><FontAwesomeIcon icon={faUser} style={{ color: "#5b12b5", }} className='fa-1x ' />Login</button></Link> :

            <Link to={'/'} ><button type="button" onClick={handleLogout} className='px-4 py-2 border border-black rounded hover:bg-cyan-700 hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='md:me-3' />Logout</button></Link>}

        </div>
        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}><li className='mx-3  mt-3 md:mt-0 font-bold'>Home</li></Link>
          <Link to={'/medicines'}><li className='mx-3  mt-3 md:mt-0 font-bold'>Shop</li></Link>
          <Link to={'/orderhistory'}><li className='mx-3  mt-3 md:mt-0 font-bold'>Orders</li></Link>
          <Link to={'/contactus'}><li className='mx-3  mt-3 md:mt-0 font-bold'>Contact</li></Link>

        </ul>

      </nav>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Header
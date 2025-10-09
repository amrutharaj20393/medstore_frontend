import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateUserProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'

function Profile() {
    const [token, setToken] = useState("")
    const [preview, setPreview] = useState("")
    const [updatestatus, setUpdateStatus] = useState({})
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        cpassword: "",
        profile: ""

    })

    const [existingProfileImage, setExistingProfileImage] = useState("")
    const handlefileAdd = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        if (e.target.files[0] != 0) {
            const url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    //console.log(existingProfileImage)
    const handleReset = () => {
        setUserDetails({
            username: "",
            password: "",
            cpassword: "",
            bio: "",
            profile: ""
        })
        setPreview("")
    }
    const handleAdd = async () => {

        const { username,
            password,
            cpassword,
            profile } = userDetails
        console.log(username,
            password,
            cpassword,
            profile)
        if (!username || !password || !cpassword) {
            toast.info("please fill all")
        }
        else {
            if (password != cpassword) {
                toast.warning('password must match')
            }

            else {
                if (preview) {
                    const reqBody = new FormData()

                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfileApi(reqBody, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        //setUserprofileupdatestatus(result.data)
                        setUserDetails({
                            username: "",
                            password: "",
                            cpassword: "",
                            bio: "",
                            profile: ""

                        })
                        setPreview("")

                    }
                    else {
                        toast.error("something went wrong")
                        setUpdateStatus(result)
                    }

                }
                else {

                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        console.log(result)
                        setUpdateStatus(result.data)
                        // setUserprofileupdatestatus(result.data)
                        //console.log(existingProfileImage)
                         setUserDetails({
                            username: "",
                            password: "",
                            cpassword: "",
                            bio: "",
                            profile: ""

                        })
                        setPreview("")

                    }
                    else {
                        toast.error("something went wrong")
                        setUpdateStatus(result)
                    }
                }

            }
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            //setUserDetails({ username: user.username, password: user.password, cpassword: user.password})
            setExistingProfileImage(user.profile)
        }

    }, [updatestatus])
    return (

        <>
            <Header />
            {token && <div id='profile' className='flex justify-center items-center flex-col mt-5 mb-5'>
                <div className='flex justify-center items-center flex-col'>
                    <h1 className='mt-5 text-2xl font-bold text-white'>Edit Profile</h1>
                </div>
                <div className='md:grid grid-cols-3 w-full '>
                    <div></div>
                    <div className='md:flex justify-center items-center mt-3 w-full  bg-amber-100  '>
                        <form className='md:p-10 p-5 w-full flex justify-center items-center md:border md:shadow md:rounded border-gray-200 flex-col'>
                            <div className="mb-3 flex justify-center items-center w-full mt-5">
                                <input id="profilefile" type="file" onChange={handlefileAdd} hidden />
                                <label htmlFor="profilefile">
                                    {existingProfileImage === "" ? (
                                        <img
                                            src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3686/3686930.png"}
                                            alt="profile"
                                            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <img
                                            src={preview ? preview : `${serverUrl}/serverupload/${existingProfileImage}`}
                                            alt="profile"
                                            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                                        />
                                    )}
                                </label>
                            </div>

                            <div className='bg-yellow-300 z-56 text-white py-4 px-4 rounded' style={{ marginTop: "-50px", marginLeft: "155px" }}><FontAwesomeIcon icon={faPen} /></div>
                            <div className='mb-3 mt-5 w-full px-5'>
                                <input onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} type="text" placeholder='UserName' className='w-full p-2 rounded border-gray-300 placeholder-black ' />

                            </div>
                            <div className='mb-3 w-full px-5 '>
                                <input onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} type="text" placeholder='Password' className='w-full p-2 rounded border-gray-300 placeholder-black  ' />
                            </div>
                            <div className='mb-3 w-full px-5'>
                                <input onChange={(e) => setUserDetails({ ...userDetails, cpassword: e.target.value })} value={userDetails.cpassword} type="text" placeholder='Confirm Password' className='w-full p-2 rounded border-gray-300 placeholder-black ' />
                            </div>

                            <div className='flex justify-end px-5 mt-5 w-full'>
                                <button type='button' onClick={handleReset} className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600 hover:border hover:border-amber-600 hover:bg-white '>Reset</button>
                                <button type='button' onClick={handleAdd} className='bg-green-600 text-black rounded py-3 px-4 hover:text-green-600 hover:border hover:border-green-600  ms-2 hover:bg-white'>Update</button>
                            </div>


                        </form>
                    </div>
                    <div></div>
                </div>

            </div>}

            <Footer />
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Profile
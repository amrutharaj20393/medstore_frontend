import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { addToCartAMedicineApi, GetAllMedicineApi } from '../../services/allApi'
import { allMedAddContext, cartMedDetContext, cartStatusContext, searchKeyContext } from '../../Context/Contextshare'
import { ToastContainer, toast } from 'react-toastify'

function Medicines() {
    const [status, setStatus] = useState(false)
    const [token, setToken] = useState("")
    const [allMedicines, setAllMedicines] = useState([])
    const [tempArray, setTempArray] = useState([])
    const { searchKey, setSearchKey } = useContext(searchKeyContext)
    const { allMedAddStatus } = useContext(allMedAddContext)
    const { setCartMedDt } = useContext(cartMedDetContext)
    const {setCartstatus}=useContext(cartStatusContext)
    ///console.log(searchKey)
    const getAllMedicines = async (searchKey, token) => {

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        // console.log(reqHeader)
        const result = await GetAllMedicineApi(searchKey, reqHeader)
        // console.log(result)
        if (result.status == 200) {
            setAllMedicines(result.data)
            setTempArray(result.data)

        }
    }
    //console.log(allMedicines)

    const filter = (data) => {
        if (data == "Nofilter") {
            setAllMedicines(tempArray)
        }
        else {
            setAllMedicines(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
        }


    }
    const handleAddCart = async (data) => {
         const reqHeader = {
        "Authorization": `Bearer ${token}`
        }

        const result = await addToCartAMedicineApi(data,reqHeader)
       /// console.log(result)
        if (result.status == 200) {
            ///console.log(result.data)
            toast.success("Add To Cart Successfully")
            setCartMedDt(result.data)
            setCartstatus(result.data)

        }
        else if (result.status == 404) {
            toast.info("Already Added To cart")
        }
    }
    ///console.log(allMedAddStatus)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {

            setToken(sessionStorage.getItem("token"))
            getAllMedicines(searchKey, sessionStorage.getItem("token"))
        }

    }, [searchKey, allMedAddStatus])
    return (
        <>
            <Header />
            {/**login */}
            {token && <div>
                <div className='flex justify-center items-center flex-col'>
                    <h1 className='mt-5 text-2xl font-bold text-cyan-600'>NetMed Products</h1>
                </div>
                <div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5 '>

                    <div className='mt-10'>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-bold text-cyan-600'>Filter By</h1>
                            <span className='md:hidden' onClick={() => setStatus(!status)}><FontAwesomeIcon icon={faBars} className='' /></span>
                        </div>


                        <div className={status ? 'md:block' : 'md:block justify-center hidden'}>
                            <div className='mt-3' onClick={() => filter("Tablets")}>
                                <input type="radio" id="Tablets" name='filter' />
                                <label htmlFor="Tablets" className="ms-3">Tablets </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Painrelief")} >
                                <input type="radio" id="Painrelief" name='filter' />
                                <label htmlFor="Painrelief" className="ms-3">Pain Relief </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Antibiotics")}>
                                <input type="radio" id="Antibiotics" name='filter' />
                                <label htmlFor="Antibiotics" className="ms-3">Antibiotics </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Cough")}>
                                <input type="radio" id="Cough" name='filter' />
                                <label htmlFor="Cough" className="ms-3">Cough & Cold </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Digestive")}>
                                <input type="radio" id="Digestive" name='filter' />
                                <label htmlFor="Digestive" className="ms-3">Digestive Health</label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Nofilter")}>
                                <input type="radio" id="Nofilter" name='filter' />
                                <label htmlFor="Nofilter" className="ms-3">No Filter</label>
                            </div>
                        </div>




                    </div>
                    <div className='md:grid grid-cols-4 w-full mt-5 py-5 '>
                        {allMedicines?.length > 0 ?
                            allMedicines?.map((item, index) => (<div className='p-3 shadow bg-gray-200 ms-5 md:mt-0 mt-5' key={index}>
                                <Link to={`/viewmedicine/${item?._id}`}><img src={item?.imageurl} alt="" style={{ width: '100%', height: '300px' }} /></Link>
                                <div className='flex  justify-center items-center flex-col ms-3'>
                                    <p className='text-blue-700 text-bold text-center'>{item?.Medname.slice(0, 20)}......</p>
                                    <h3 className='text-gray-500'>{item?.brandname}</h3>
                                    <p className='text-blue-700'>Best Price <span className='text-red-700'>*Rs.{item?.price}</span></p>
                                    <button onClick={() => handleAddCart(item)} className='bg-blue-800 text-white px-5 p-2 mt-3 rounded  hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Add Cart</button>
                                </div>

                            </div>))
                            : <p>Loading.....</p>}

                    </div>

                </div>
            </div>}

            {/**not login */}
            {!token && <div className='grid grid-cols-3 py-10'>
                <div></div>

                <div className='flex justify-center items-center flex-col w-full'>
                    <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="" />
                    <p className='mt-3 text-2xl'>Please <Link to={'/login'} className='text-red-600 underline'>Login</Link> To explore more</p>
                </div>
                <div></div>
            </div>}
            <Footer />
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

        </>
    )
}

export default Medicines
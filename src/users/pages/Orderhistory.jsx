import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { GetOrderMedicineApi } from '../../services/allApi'

import { serverUrl } from '../../services/serverUrl'
function Orderhistory() {
    const [AllOrderDet, setAllOrderDet] = useState([])
    const [token, setToken] = useState("")

    const getOrderDet = async (token) => {

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await GetOrderMedicineApi(reqHeader)
        console.log(result)
        if (result.status == 200) {

            setAllOrderDet(result.data)
        }
    }
    useEffect(() => {
        if (token) {
            getOrderDet(token);
        }
    }, [token]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <>
            <Header />
            <h1 className='text-center text-cyan-700  text-4xl' style={{ paddingTop: '120px' }}>Order History</h1>
            {token && <div>
                <div className='md:p-10 p-5   md:grid grid-cols-[2fr_1fr]'  >
                    <div className='md:px-10 overflow-x-auto'>
                        <table className='w-full border border-gray-900 shadow-2xl '>
                            <thead>
                                <tr>
                                    <th className='border border-gray-900 p-4 bg-blue-500'>#</th>
                                    <th className='border border-gray-900 p-4 bg-blue-500'>MedName</th>
                                    <th className='border border-gray-900 p-4 bg-blue-500'>Image</th>
                                    <th className='border border-gray-900 p-4 bg-blue-500'>Price</th>
                                    <th className='border border-gray-900 p-4 bg-blue-500'>Category</th>

                                </tr>
                            </thead>
                            <tbody>
                                {AllOrderDet?.length > 0 &&
                                    AllOrderDet.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center border border-gray-500 p-2'>{index + 1}</td>
                                            <td className='text-center border border-gray-500 p-2'>{item?.Medname}</td>

                                            <td className='text-center border border-gray-500 p-2 flex justify-center'><img src={`${serverUrl}/serverupload/${item?.imageurl}`}alt="" style={{ width: '150px', height: '100px' }} /></td>
                                            <td className='text-center border border-gray-500 p-2'>{item?.price}</td>

                                            <td className='text-center border border-gray-500 p-2'>{item?.category}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <div className='md:px-10 px-5 mt-10 md:mt-0'>
                        <div className='shadow-2xl p-5 '>
                            <h1 className='text-center text-3xl  text-cyan-700' >Order Summary</h1>
                            <h4 className='mt-4'>Total Number of products:{AllOrderDet?.length}</h4>

                            <h4>Grand Total:{AllOrderDet?.map((item) => item.price).reduce((p1, p2) => p1 + p2, 0)}.00</h4>

                        </div>
                    </div>

                </div>
                <div className='mt-5 flex justify-center items-center'>
                    <Link to={'/'}> <button className='bg-red-700 mb-5 px-3 py-2 text-white rounded hover:border hover:border-red-500 hover:text-red-500 hover:bg-white'>Back Home
                    </button></Link>
                </div>
            </div>}

            {!token && <div className='grid grid-cols-3 py-10'>
                <div></div>

                <div className='flex justify-center items-center flex-col w-full'>
                    <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="" />
                    <p className='mt-3 text-2xl'>Please <Link to={'/login'} className='text-red-600 underline'>Login</Link> To explore more</p>
                </div>
                <div></div>
            </div>}


            <Footer />
        </>
    )
}

export default Orderhistory
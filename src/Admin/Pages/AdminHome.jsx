import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../Components/AdminHeader'
import Adminsidebar from '../Components/Adminsidebar'
import { GetAllMedicineAdminApi, GetAllUsersAdminApi, GetOrderMedicineAdminApi } from '../../services/allApi'

function AdminHome() {

    const [AllOrderDet, setAllOrderDet] = useState([])
    const [AllUserDetails, setAllUserDetails] = useState([])
    const [AllmedDetails, setAllMedDetails] = useState([])
    let userArray = []
    const getOrderDet = async () => {
        const result = await GetOrderMedicineAdminApi()
        //console.log(result)
        if (result.status == 200) {

            setAllOrderDet(result.data)
        }
    }

    const getALLUserDetails = async (token) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`

        }
        const result = await GetAllUsersAdminApi(reqHeader)
        ///console.log(result)
        if (result.status == 200) {

            userArray = result.data.filter((item) => item.email != 'admin@gmail.com')
            setAllUserDetails(userArray)
        }

    }

     const getAllMedAdmin = async (token) => {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
    
            }
            const result = await GetAllMedicineAdminApi(reqHeader)
            console.log(result)
            if (result.status == 200) {
                setAllMedDetails(result.data)
            }
    
        }

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        getOrderDet()
        if (storedToken) {
            getALLUserDetails(storedToken);
            getAllMedAdmin(storedToken)
        }
    }, [])

    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-cyan-500 md:flex  md:flex-col items-center h-min-lvh '>
                    <Adminsidebar />
                </div>
                <div className='p-10'>
                    <div className='md:grid grid-cols-3'>
                        <div className=' px-5 py-5 md:py-0'>
                            <div className=' bg-cyan-600 p-4 flex rounded text-white'>


                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Orders</h1 >
                                    <h1 className='text-3xl'>{AllOrderDet.length}+</h1>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5 py-5 md:py-0'>
                            <div className=' bg-red-600 p-4 flex rounded text-white'>


                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Products</h1 >
                                    <h1 className='text-3xl'>{AllmedDetails.length}+</h1>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5 py-5 md:py-0'>
                            <div className=' bg-green-600 p-4 flex rounded text-white'>


                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Users</h1 >
                                    <h1 className='text-3xl'>{AllUserDetails.length}+</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* { <div>
                        <h2 className='mt-5 text-2xl text-cyan-600 font-medium'>Recent Orders</h2>
                        <div className='md:px-10 overflow-x-auto'>
                            <table className='w-full border border-gray-900 shadow-2xl mt-5'>
                                <thead>
                                    <tr>
                                        <th className='border border-gray-900 p-2 bg-blue-500'>OrderId</th>
                                        <th className='border border-gray-900 p-2 bg-blue-500'>Customer</th>
                                        <th className='border border-gray-900 p-2 bg-blue-500'>Med Name</th>
                                        <th className='border border-gray-900 p-2 bg-blue-500'>Status</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center border border-gray-500 p-2'>1</td>
                                        <td className='text-center border border-gray-500 p-2'>Anitja</td>

                                        <td className='text-center border border-gray-500 p-2'>Paracetamol</td>
                                        <td className='text-center border border-gray-500 p-2'>Pending</td>



                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>} */}

                </div>

            </div>
            <Footer />
        </>
    )
}

export default AdminHome
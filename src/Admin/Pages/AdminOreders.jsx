import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../Components/AdminHeader'
import Adminsidebar from '../Components/Adminsidebar'
import { GetOrderMedicineAdminApi } from '../../services/allApi'


function AdminOreders() {
    const [AllOrderDet, setAllOrderDet] = useState([])
    const getOrderDet = async () => {
        const result = await GetOrderMedicineAdminApi()
        //console.log(result)
        if (result.status == 200) {

            setAllOrderDet(result.data)
        }
    }
    useEffect(()=>{
getOrderDet()
    },[])
    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-cyan-500 flex  flex-col items-center h-min-lvh '>
                    <Adminsidebar />
                </div>
                <div className='md:px-10 overflow-x-auto'>
                    <h1 className='text-cyan-800 text-2xl font-bold mt-5'>Order List</h1>
                    <table className='w-full border border-gray-900 shadow-2xl mt-5'>
                        <thead>
                            <tr>
                                <th className='border border-gray-900 p-2 bg-blue-500'>No</th>
                                <th className='border border-gray-900 p-2 bg-blue-500'>Medname</th>
                                <th className='border border-gray-900 p-2 bg-blue-500'>Brandname</th>
                                <th className='border border-gray-900 p-2 bg-blue-500'>Price</th>
                               <th className='border border-gray-900 p-2 bg-blue-500'>UserMailId</th> 
                                <th className='border border-gray-900 p-2 bg-blue-500'>Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            {AllOrderDet?.length > 0 &&
                                AllOrderDet?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center border border-gray-500 p-2'>{index + 1}</td>
                                        <td className='text-center border border-gray-500 p-2'>{item?.Medname}</td>
                                        <td className='text-center border border-gray-500 p-2'>{item?.brandname}</td>

                                        <td className='text-center border border-gray-500 p-2'>{item?.price}</td>
                                         <td className='text-center border border-gray-500 p-2'>{item?.brought}</td>
                                        <td className='text-center border border-gray-500 p-2'>{item?.status}</td>




                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default AdminOreders
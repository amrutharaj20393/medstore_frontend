import React, { useEffect, useState } from 'react'

import Footer from '../../components/Footer'
import AdminHeader from '../Components/AdminHeader'
import Adminsidebar from '../Components/Adminsidebar'

import { GetAllUsersAdminApi } from '../../services/allApi'
function AdminUsers() {

    const [AllUserDetails, setAllUserDetails] = useState([])
    const [token, setToken] = useState("")
    let userArray = []


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
    ///console.log(AllUserDetails)
    const handleEdit = () => {
        setEditUserDetails(item)
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const token = sessionStorage.getItem("token")
            getALLUserDetails(token)

        }
    }, [])
    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-cyan-500 flex  flex-col items-center h-min-lvh'>
                    <Adminsidebar />
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-cyan-800 mb-4">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow">
                            <thead className="bg-cyan-100 text-gray-700">
                                <tr>
                                    <th className="text-left px-4 py-2">#</th>
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="text-left px-4 py-2">Email</th>

                                    <th className="text-left px-4 py-2">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {AllUserDetails?.length > 0 &&
                                    AllUserDetails?.map((item, index) => (
                                        <tr className="border-t" key={index}>
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2">{item?.username}</td>
                                            <td className="px-4 py-2">{item?.email}</td>

                                            <td className="px-4 py-2 text-green-600">Active</td>

                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

            <Footer />
        </>
    )
}

export default AdminUsers
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../Components/AdminHeader'
import Adminsidebar from '../Components/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addMedicineApi, deleteAMedicineAdminApi, editAMedicineAdminApi, GetAllMedicineAdminApi } from '../../services/allApi'
import { allMedAddContext } from '../../Context/Contextshare'


function AdminProducts() {
    const [modalstatus, setModalStatus] = useState(false)
    const [modaleditstatus, setEditModalStatus] = useState(false)
    const [medDetails, setMedDetails] = useState({
        Medname: "", price: "", stock: "", uploadedImage: "", brandname: "", category: "", status: "", description: "", brought: ""

    })
    const [token, setToken] = useState("")
    const [AllmedDetails, setAllMedDetails] = useState([])
    const [editMedDetails, setEditMedDetails] = useState({})
    const [deleteStatus, setDeleteStatus] = useState({})
    const [addMedStatus, setAddMedStatus] = useState({})
    const [editMedStatus, setEditMedStatus] = useState({})
    const { setAllMedAddStatus } = useContext(allMedAddContext)

    const [preview, setpreview] = useState("")
    //console.log(medDetails)
    const handleReset = () => {
        setMedDetails({
            Medname: "", price: "", stock: "", uploadedImage: "", brandname: "", category: "", description: "", brought: ""
        })
        setpreview("")
    }
    const handleupload = (e) => {
        console.log(e.target.files[0])
        const singlefile = e.target.files[0]
        setMedDetails({ ...medDetails, uploadedImage: singlefile })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setpreview(url)
    }
    const handleSubmit = async () => {
        const { Medname, price, stock, uploadedImage, brandname, status, category, description, brought } = medDetails
        if (!Medname || !price || !stock || !brandname || !category || !description) {
            toast.info('please fill details')
        }
        else {

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            console.log(uploadedImage)
            const reqBody = new FormData()//it is a class
            for (let key in medDetails) {
                reqBody.append(key, medDetails[key])
            }
            console.log(reqBody)
            const result = await addMedicineApi(reqBody, reqHeader)
            console.log(result)
            if (result.status == 200) {
                toast.success("Medicine added successfully")
                setAddMedStatus(result.data)
                setAllMedAddStatus(result.data)
                handleReset()
            }
            else if (result.data == 400) {
                toast.warning(result.response.data)
                handleReset()
            }
            else {
                toast.error('something went wrong')
                handleReset()
            }
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
    const handleEdit = (item) => {
        setEditMedDetails(item)

    }
    //
    // console.log(editMedDetails)
    const handleSubmitEdit = async (token) => {
        const { _id, Medname, price, stock,  brandname, category, description, brought } = editMedDetails
        console.log(_id, Medname, price, stock,  brandname, category, description, brought)

        const result = await editAMedicineAdminApi({ _id, Medname, price, stock,  brandname, category, description, brought })
        ///console.log(result)
        if (result.status == 200) {
            toast.success("Edited successfully")
            setEditMedStatus(result.data)

        }


    }

    const deleteMedicine = async (id) => {
        const result = await deleteAMedicineAdminApi(id)
        ///console.log(result)
        if (result.status == 200) {
            toast.success("Deleted successfully")
            setDeleteStatus(result)

        }
    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const token = sessionStorage.getItem("token")
            getAllMedAdmin(token)

        }

    }, [deleteStatus, addMedStatus, editMedStatus])
    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-cyan-500 flex  flex-col items-center h-min-lvh  '>
                    <Adminsidebar />
                </div>
                <div className='mt-5'>
                    <div className='md:flex justify-between items-center '>
                        <h2 className='mt-5 text-2xl text-cyan-600 font-bold mx-5'>Product Management</h2>
                        <button onClick={() => setModalStatus(true)} className='bg-blue-800 text-white px-5 me-5 p-2 mt-3 rounded  hover:bg-white hover:border border-blue-500 hover:text-blue-600 '>Add Item </button>
                    </div>

                    <div className="p-6">

                        <div className="p-4 overflow-x-auto">

                            <table className="min-w-full bg-white rounded-lg shadow">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="text-left px-4 py-2">#</th>
                                        <th className="text-left px-4 py-2">Product Name</th>
                                        <th className="text-left px-4 py-2">Brandname</th>
                                        <th className="text-left px-4 py-2">Category</th>
                                        <th className="text-left px-4 py-2">Price</th>
                                        <th className="text-left px-4 py-2">Stock</th>
                                        <th className="text-left px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {AllmedDetails.length > 0 &&
                                        AllmedDetails.map((item, index) => (
                                            <tr className="border-t" key={index}>
                                                <td className="px-4 py-2">{index + 1}</td>
                                                <td className="px-4 py-2">{item?.Medname}</td>
                                                <td className="px-4 py-2">{item?.brandname}</td>
                                                <td className="px-4 py-2">{item?.category}</td>
                                                <td className="px-4 py-2">{item?.price}</td>
                                                <td className="px-4 py-2">{item?.stock}</td>
                                                <td className="px-4 py-2 space-x-2">
                                                    <button onClick={() => {
                                                        setEditModalStatus(true);
                                                        handleEdit(item);
                                                    }} className="text-blue-600 hover:underline">Edit</button>
                                                    <button onClick={() => deleteMedicine(item?._id)} className="text-red-600 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>


            {modalstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                            {/**title */}
                            <div className="bg-cyan-500 p-4 flex sm:px-6 justify-between">
                                <h1 className='text-white text-2xl'>Add Product</h1>
                                <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                            </div>

                            {/**body */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mb-3">
                                    <input value={medDetails.Medname} onChange={(e) => setMedDetails({ ...medDetails, Medname: e.target.value })} type="text" placeholder='Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={medDetails.price} onChange={(e) => setMedDetails({ ...medDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={medDetails.stock} onChange={(e) => setMedDetails({ ...medDetails, stock: e.target.value })} type="text" placeholder='Stock' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>

                                <div className="mb-3">
                                    <input value={medDetails.brandname} onChange={(e) => setMedDetails({ ...medDetails, brandname: e.target.value })} type="text" placeholder='Brand name' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={medDetails.category} onChange={(e) => setMedDetails({ ...medDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={medDetails.description} onChange={(e) => setMedDetails({ ...medDetails, description: e.target.value })} type="text" placeholder='Description' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3 flex justify-center items-center w-full mt-5">
                                    {!preview ? <label htmlFor='imagefile'>
                                        <input id="imagefile" type='file' style={{ display: 'none' }} onChange={(e) => handleupload(e)} />
                                        <img src="https://cdn-icons-png.flaticon.com/512/3616/3616929.png" alt="" style={{ width: '150px', height: '150px' }} />
                                    </label> :
                                        <img src={preview} alt="" style={{ width: '150px', height: '150px' }} />
                                    }
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleSubmit} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto">Add Medicine</button>
                                <button onClick={handleReset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {modaleditstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                            {/**title */}
                            <div className="bg-cyan-500 p-4 flex sm:px-6 justify-between">
                                <h1 className='text-white text-2xl'>Edit Product</h1>
                                <FontAwesomeIcon onClick={() => setEditModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                            </div>

                            {/**body */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mb-3">
                                    <input value={editMedDetails.Medname} onChange={(e) => setEditMedDetails({ ...editMedDetails, Medname: e.target.value })} type="text" placeholder='Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={editMedDetails.price} onChange={(e) => setEditMedDetails({ ...editMedDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={editMedDetails.stock} onChange={(e) => setEditMedDetails({ ...editMedDetails, stock: e.target.value })} type="text" placeholder='Stock' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                {/* <div className="mb-3">
                                    <input value={editMedDetails.imageurl} onChange={(e) => setEditMedDetails({ ...editMedDetails, imageurl: e.target.value })} type="text" placeholder='Imageurl' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div> */}
                                <div className="mb-3">
                                    <input value={editMedDetails.brandname} onChange={(e) => setEditMedDetails({ ...editMedDetails, brandname: e.target.value })} type="text" placeholder='Brand name' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>

                                <div className="mb-3">
                                    <input value={editMedDetails.category} onChange={(e) => setEditMedDetails({ ...editMedDetails, category: e.target.value })} type="text" placeholder='category' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                                <div className="mb-3">
                                    <input value={editMedDetails.description} onChange={(e) => setEditMedDetails({ ...editMedDetails, description: e.target.value })} type="text" placeholder='description' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleSubmitEdit} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto">Edit Medicine</button>
                                <button type="button" onClick={() => setEditModalStatus(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <Footer />
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default AdminProducts
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GetAMedicineApi } from '../../services/allApi'

function Viewmedicine() {
    const [amedicine, setAMedicine] = useState({})
    const { id } = useParams()
    console.log(id)
    const viewAmedicine = async (id) => {
        const result = await GetAMedicineApi(id)
       /// console.log(result)
        if (result.status == 200) {
            setAMedicine(result.data)
        }

    }
   /// console.log(amedicine)
    useEffect(() => {

        viewAmedicine(id)
    }, [])
    return (
        <>
            <div className='md:grid grid-cols-3 w-full'>
                <div></div>
                <div className='shadow rounded bg-gray-300 w-full mt-10 px-10 py-10 flex justify-center items-center'>

                    <div className=' flex justify-center items-center' >
                        <div className='ms-5 mb-5  rounded '>
                            <img src={amedicine.imageurl} alt="no image" style={{ height: '250px', width: '500px' }} className='mt-5 mb-5' />

                        </div>
                        <div className='w-full mt-10 flex justify-center items-center flex-col'>
                            <h2 className='text-2xl  text-bold'>{amedicine.Medname}</h2>



                            <h3 className='text-red-500 '>Price:${amedicine.price}</h3>

                            <h3>Brandname:{amedicine.brandname}</h3>
                            <p className='ms-2 mt-4'>Description:{amedicine.description}</p>
                            <p className='mt-5 ms-2'>Delivery by Tomorrow, before 10:00 pm</p>



                            <div className='flex justify-end mt-4 ms-3'>
                                <Link to={'/medicines'}><button className='px-5 py-3 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border border-blue-600 rounded me-5'>Back</button></Link>
                                <button className='px-5 bg-green-600 text-white hover:bg-white hover:text-green-600 hover:border border-green-600 rounded me-3'>Buy ${amedicine.price}</button>

                            </div>

                        </div>
                    </div>


                </div>
                <div></div>
            </div>

        </>
    )
}

export default Viewmedicine
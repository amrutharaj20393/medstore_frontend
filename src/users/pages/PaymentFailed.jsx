import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentFailed() {
  return (
    <>
    <Header/>
  <div className='container' style={{marginTop:"200px"}}>
        <div className="md:grid grid-cols-2 px-10 mt-5 flex justify-center items-center flex-col">
          <div className=''>
            <h1 className='md:text-4xl text-blue-500'>Sorry......</h1>
            <p className='mt-4 text-red-700'>Ypur Payment is Unsuccessful</p>
          <Link to={'/medicines'}><button className='bg-blue-600 px-4 py-3 text-white mb-5'>back</button></Link> 
          </div>
          <div className='flex justify-center items-center'>
            <img src="https://cdn.dribbble.com/userupload/21333154/file/original-d373e3fc29335ed66389a37c09208855.gif" alt="" className='w-full'/>
          </div>
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default PaymentFailed
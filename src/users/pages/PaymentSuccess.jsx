import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='container' style={{marginTop:"200px"}}>
        <div className="md:grid grid-cols-2 px-5  flex justify-center items-center flex-col">
          <div >
            <h1 className='md:text-4xl text-blue-500'>Congratulations</h1>
            <p className='mt-4'>Payment Succesfull.Your Order is Placed.Hope you have good time..................</p>
          <Link to={'/medicines'}><button className='bg-blue-600 px-4 py-3 text-white mb-5'>back</button></Link> 
          </div>
          <div className='flex justify-center items-center'>
            <img src="https://icpih.com/media-intestinal-health-ihsig/PAYMENT-SUCCESS.png" alt="" className='w-full'/>
          </div>
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess

import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

import { Link } from 'react-router-dom'
import { GetCartMedicineApi, makePaymentApi } from '../../services/allApi'
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify'

function Cart() {
  const [amedicine, setAMedicine] = useState([])
  const [token, setToken] = useState("")
  // const {setCartMedDt}=useContext(cartMedDetContext)
  const getCartMedicineDet = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    ///console.log(reqHeader)
    const result = await GetCartMedicineApi(reqHeader)
   // console.log(result)
    if (result.status == 200) {

      setAMedicine(result.data.cartItems)
      //setCartMedDt(result.data)
    }
    else if (result.status == 401) {
      console.log("no cart data")
      setAMedicine([])

    }
  }
  // console.log(amedicine)

  const makePayment = async (data) => {

    ///console.log(data)
    const stripe = await loadStripe('pk_test_51RSxz22LjIoQ1c2HuAKfvCfsyoYqO3AfMShsZne9aKylEaDoB8iDVIWnTBF6zRGSOcCPM3zPErr3uxkOGUpIK9XB00iZRhl8e5');

    const reqBody = {

      medDetails: data
    }
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody, reqHeader)
    //console.log(result)


    const sessionId = result.data.sessionId

    const response = stripe.redirectToCheckout({
      sessionId: sessionId
    })
    if (response.error) {
      toast.error('something went wrong')
    }

  }


  useEffect(() => {
    if (token) {
      getCartMedicineDet(token);
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
      <div className='flex justify-center items-center flex-col mt-5'>
        <h1 className='text-3xl text-cyan-800 font-bold'>My Cart</h1>
        <div className="md:px-20 md:py-10 ">
          <img src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1746532377_Web_Home_Banner.jpg" alt="" style={{ width: '100%', height: '200px' }} />
        </div>

        <div className='md:grid grid-cols-2 '>

          <div className='md:flex justify-center items-center flex-col ms-5 md:px-0 px-5'>

            <div className='flex justify-around '>
              <h2 className='text-2xl text-cyan-800 font-bold me-25'>Prescription Items</h2>
              <Link to={'/'}><h2 className='text-2xl text-cyan-800 font-bold ms-10'>Add Items</h2></Link>
            </div>


            {amedicine.length > 0 ?
              amedicine.map((item, index) => (
                <div className='md:grid grid-cols-3 mt-5 shadow rounded-2xl w-100' key={index}>
                  <div>
                    <img src={item?.imageurl} alt="" />
                  </div>
                  <div className='md:flex justify-center items-center flex-col md:mx-0 mx-5'>
                    <h4>{item?.Medname}</h4>
                    <p>{item?.brandname}</p>
                    <h4 className='text-red-700'>$Rs: {item?.price}</h4>
                  </div>
                  <div className='md:flex  justify-end items-center mb-5 mt-5 px-2  md:mx-0 mx-5'>
                    <button type='button' onClick={() => makePayment(item)} className='bg-blue-800 text-white px-5 p-2 mt-3 rounded  hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Order</button>
                  </div>


                </div>
              ))
              : <p className='mt-5'>Loading...................</p>}



          </div>
          <div>

            <div className='md:px-10  mt-10 md:mt-0 w-full'>
              <div className='md:flex justify-center items-center flex-col shadow-2xl p-5 '>
                <h1 className='text-center text-3xl text-cyan-700' >Cart Summary</h1>
                <h4 className='mt-4'>Total Number of products :<span className='text-red-500'>{amedicine?.length}</span></h4>

                <h4 >Grand Total :<span className='text-red-500'>$</span><span className='text-red-500'>{amedicine?.map((item) => item.price).reduce((p1, p2) => p1 + p2, 0)}.00</span></h4>
                <Link to={'/'}><button className='bg-green-500 mt-5 p-4 w-full text-white'>CheckOut</button></Link>
              </div>
            </div>
          </div>

        </div>


        <div className='mt-5 flex justify-center items-center mb-5'>

        </div>

      </div>

      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  )
}

export default Cart
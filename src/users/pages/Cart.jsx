import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

import { Link } from 'react-router-dom'
import { GetCartMedicineApi, makePaymentApi } from '../../services/allApi'
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify'
import { quantityContext } from '../../Context/Contextshare'
import { serverUrl } from '../../services/serverUrl'

function Cart() {
  const [amedicine, setAMedicine] = useState([])
  const [token, setToken] = useState("")
  const [quantities, setQuantities] = useState({}); // { _id: qty }
  const { setQuantityStatus } = useContext(quantityContext)
  // handle change for a specific item
  const handleChange = (e, id) => {
    setQuantities({
      ...quantities,
      [id]: e.target.value
    });
  };

  const getCartMedicineDet = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    ///console.log(reqHeader)
    const result = await GetCartMedicineApi(reqHeader)
    console.log(result)
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

      medDetails: data,
      quantity: Number(quantities[data._id] || 1)
    }
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody, reqHeader)
    //console.log(result)

    setQuantityStatus(result.data)
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
          <img src="https://harutheme.com/wp-content/uploads/2019/10/medicor.jpg" alt="" style={{ width: '100%', height: '300px' }} />
        </div>

        <div className='md:grid grid-cols-2 '>

          <div className='md:flex justify-center items-center flex-col ms-5 md:px-0 px-5 w-100'>

            <div className='flex justify-around '>
              <h2 className='text-2xl text-cyan-800 font-bold me-25'>Prescription Items</h2>
              <Link to={'/'}><h2 className='text-2xl text-cyan-800 font-bold ms-10'>Add Items</h2></Link>
            </div>


            {amedicine.length > 0 ?
              amedicine.map((item, index) => (
                <div className='md:grid grid-cols-3 mt-5 shadow rounded-2xl w-100' key={index}>
                  <div>
                    <img src={`${serverUrl}/serverupload/${item?.imageurl}`} alt="" />
                  </div>
                  <div className='md:flex justify-center items-center flex-col md:mx-0 mx-5'>
                    <h4>{item?.Medname}</h4>
                    <p>{item?.brandname}</p>
                    <h4 className='text-red-700'>$Rs: {item?.price}</h4>


                  </div>
                  <div className='md:flex justify-end items-center mb-5 mt-5 px-2 flex-col md:mx-0 mx-5'>
                    <div className='mb-3 me-2 '>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter Quantity"
                        value={quantities[item._id] || ""}            // only this item’s qty
                        onChange={(e) => handleChange(e, item._id)}   // update only this item
                        className="p-2 border rounded w-35"
                      />
                    </div>
                    <div>
                      <button type='button' onClick={() => makePayment(item)} className='bg-blue-800 text-white px-5 p-2 mt-3 rounded  hover:bg-white hover:border border-blue-500 hover:text-blue-600 w-full '>Order</button>
                    </div>

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

                <h3 className="mt-4">
                  Grand Total: Rs{" "}
                  {amedicine.reduce((sum, item) => {
                    const qty = Number(quantities[item._id] || 1);
                    return sum + item.price * qty;
                  }, 0)}
                </h3>
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
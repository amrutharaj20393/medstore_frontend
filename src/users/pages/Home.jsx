import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { GetAllMedicineHomeApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
function Home() {
  const [homeMed, setHomeMed] = useState([])

  const getHomeMedicines = async () => {

    const result = await GetAllMedicineHomeApi()
  console.log(result)
    if(result.status==200){
      setHomeMed(result.data)
    }
  }
  useEffect(() => {
    getHomeMedicines()
  }, [])
  return (
    <>
      <Header />
      <header>
      </header>
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h1 className='text-5xl font-bold text-cyan-900'>Featured Categories</h1>

        <div className='md:grid grid-cols-4 w-full mt-5 rounded-2xl ms-3'>
          <div className='p-3 px-3 shadow rounded-2xl'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6wJRRMgLwTCyUd5edx2k6eUZNrNMKgvdoSQ&s" alt="" style={{ width: '100%', height: '300px' }} />
            <div className='flex  justify-center items-center flex-col ms-3'>


            </div>

          </div>
          <div className='p-3 px-3 shadow rounded-2xl ms-3'>
            <img src="https://www.shutterstock.com/image-vector/medical-device-icon-set-pulse-260nw-1705138525.jpg" alt="" style={{ width: '100%', height: '300px' }} />
            <div className='flex  justify-center items-center flex-col ms-3'>

            </div>

          </div>
          <div className='p-3 px-3 shadow rounded-2xl ms-3'>
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20210912/pngtree-vintage-wooden-board-table-personal-care-products-image_864129.jpg" alt="" style={{ width: '100%', height: '300px' }} />
            <div className='flex  justify-center items-center flex-col ms-3'>

            </div>

          </div>
          <div className='p-3 px-3 shadow rounded-2xl ms-3'>
            <img src="https://www.shutterstock.com/image-photo/couple-running-together-on-sunny-260nw-2547631819.jpg" alt="" style={{ width: '100%', height: '300px' }} />
            <div className='flex  justify-center items-center flex-col ms-3'>

            </div>

          </div>
        </div>

      </section>

      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h1 className='text-5xl  font-bold text-cyan-900'>Best Selling Products</h1>

        <div className='md:grid grid-cols-4 w-full mt-5'>
         {homeMed?.length>0?
         homeMed?.map((item,index)=>( <div className='p-3 shadow bg-gray-200 ms-5' key={index}>
            <img src={`${serverUrl}/serverupload/${item?.imageurl}`} alt="" style={{ width: '100%', height: '300px' }} />
            <div className='flex  justify-center items-center flex-col ms-3'>
              <p className='text-blue-700 text-bold text-center'>{item?.Medname}</p>
              <h3 className='text-gray-500'>{item?.brandname}</h3>
              <p className='text-blue-700'>Best Price <span className='text-red-700'>*Rs.{item?.price}</span></p>
              <Link to={'/medicines'}><button  className='bg-blue-800 text-white p-2 mt-3 rounded ms-3 hover:bg-white hover:border border-blue-500 hover:text-blue-600'>Add To Cart</button></Link>
            </div>

          </div>)):<p>Loading</p>}
          
        </div>
        <div className='flex justify-center items-center my-5'>
          <Link to={'/medicines'}><button className='px-3 py-2 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Shop More</button></Link>
        </div>
      </section>
      <section className='flex justify-center items-center  md:p-10 md:px-40 p-5'>
        <img src="https://images.apollo247.in/images/askApolloV3/images/web-banner.svg?tr=q-80,w-1250,dpr-2,c-at_max" alt="" />
      </section>
      <section className='flex justify-center items-center  md:p-10 md:px-40 p-5'>
        <img src="https://images.apollo247.in/images/category/threeStepsherobannerfinal.png?tr=q-80,f-webp,w-1250,dpr-2,c-at_max" alt="" />
      </section>
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h1 className='text-5xl font-bold text-cyan-900'>Popular Brands</h1>

        <div className='md:grid grid-cols-5 w-full mt-5  ms-3'>
          <div className='p-3 px-3 shadow rounded ms-3'>
            <img src="https://images.apollo247.in/images/category/dhootapapeshwar_web.png?tr=q-80,f-webp,w-150,dpr-2,c-at_max" alt="" style={{ width: '100%', height: '300px' }} />


          </div>
          <div className='p-3 px-3 shadow rounded ms-3'>
            <img src="https://images.apollo247.in/images/category/avp_web.png?tr=q-80,f-webp,w-150,dpr-2,c-at_max" alt="" style={{ width: '100%', height: '300px' }} />


          </div>
          <div className='p-3 px-3 shadow rounded ms-3'>
            <img src="https://images.apollo247.in/images/category/himalaya_web.png?tr=q-80,f-webp,w-150,dpr-2,c-at_max" alt="" style={{ width: '100%', height: '300px' }} />

          </div>
          <div className='p-3 px-3 shadow rounded ms-3'>
            <img src="https://images.apollo247.in/images/category/kottakkal_web.png?tr=q-80,f-webp,w-150,dpr-2,c-at_max" alt="" style={{ width: '100%', height: '300px' }} />


          </div>
          <div className='p-3 px-3 shadow rounded-2xl ms-3'>
            <img src="https://images.apollo247.in/images/category/kottakkal_web.png?tr=q-80,f-webp,w-150,dpr-2,c-at_max" alt="" style={{ width: '100%', height: '300px' }} />


          </div>
        </div>

      </section>
      <Footer />
    </>
  )
}

export default Home
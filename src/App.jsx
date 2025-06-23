import { useEffect, useState } from 'react'

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import Pagenotfound from './pages/Pagenotfound'
import Preloader from './components/Preloader'
import Medicines from './users/pages/Medicines'
import Contactus from './users/pages/Contactus'
import Cart from './users/pages/Cart'
import Orderhistory from './users/pages/Orderhistory'
import AdminHome from './Admin/Pages/AdminHome'
import AdminProducts from './Admin/Pages/AdminProducts'
import AdminOreders from './Admin/Pages/AdminOreders'
import AdminUsers from './Admin/Pages/AdminUsers'
import Viewmedicine from './users/pages/Viewmedicine'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentFailed from './users/pages/PaymentFailed'

function App() {
  const [isloading, setIsLoading] = useState(false)
  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(true)
    }, 3000);
  },[])

  return (
    <>
   
<Routes>
  <Route path='/' element={isloading?<Home/>:<Preloader/>}></Route>
  <Route path='/login' element={<Auth/>}></Route>
  <Route path='/register' element={<Auth register/>}></Route>
  <Route path='/medicines' element={<Medicines/>}></Route>
  <Route path='/viewmedicine/:id' element={<Viewmedicine/>}></Route>
  <Route path='/contactus' element={<Contactus/>}></Route>
  <Route path='/cart' element={<Cart/>}></Route>
  <Route path='/orderhistory' element={<Orderhistory/>}></Route>
  <Route path='/admin-home' element={isloading?<AdminHome/>:<Preloader/>}></Route>
  <Route path='/admin-products' element={<AdminProducts/>}></Route>
  <Route path='/admin-orders' element={<AdminOreders/>}></Route>
  <Route path='/admin-users' element={<AdminUsers/>}></Route>
  <Route path='/payment-succcess' element={<PaymentSuccess/>}></Route>
  <Route path='/payment-error' element={<PaymentFailed/>}></Route>


  <Route path='/*' element={<Pagenotfound/>}></Route>
</Routes>

   
    </>
  )
}

export default App

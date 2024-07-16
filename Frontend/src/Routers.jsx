import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './utils/Protected.config';
import Loginu from './components/User/Loginu';
import Index from './components/User/Index';
import Register from './components/User/Register';
import Home from './components/User/Home';
import Cart from './components/User/Cart';
import Myorder from './components/User/Myorder';
import Orderdetails from './components/User/Orderdetails';


export default function Routers() {
  const [wantSidebar, setWantSidebar] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/login' element={<Loginu />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Protected><Home /></Protected>}></Route>
          <Route path='/cart' element={<Protected><Cart /></Protected>}></Route>
          <Route path='/my_order' element={<Protected><Myorder /></Protected>}></Route>
          <Route path='/order_details' element={<Protected>< Orderdetails /></Protected>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

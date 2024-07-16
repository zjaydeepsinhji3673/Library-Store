import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/admin/Login'
import Protectedadmin from './utils/Protectedadmin.config'
import Dashboard from './components/admin/Dashboard'
import Addbook from './components/admin/Addbook'
import Pendingorders from './components/admin/Pendingorders'
import Allorders from './components/admin/Allorders'
import Sidebar from './components/admin/Sidebar'
import Books from './components/admin/Books';
import Accptedorder from './components/admin/Accptedorder'
import Rejectedorder from './components/admin/Rejectedorder'
import Orderdetails from './components/admin/Orderdetails'
import AcceptReject from './components/admin/AcceptReject'
export default function AdminRoute() {
    const [wantSidebar, setWantSidebar] = useState(true);
    return (
        <>
            <BrowserRouter>
                {wantSidebar ? (
                    <div className='row'>
                        <div className='col-3' style={{ backgroundColor: '#1d1d1d' }}><Sidebar wantSidebar={wantSidebar} setWantSidebar={setWantSidebar} /></div>
                        <div className='col'>
                            <Routes>
                                <Route path='/admin/' element={<Login />}></Route>
                                <Route path='/admin/dashboard' element={<><Protectedadmin ><Dashboard /></ Protectedadmin></>} />
                                <Route path='/admin/add_book' element={<><Protectedadmin >< Addbook /></Protectedadmin></>}> </Route>
                                <Route path='/admin/pending_orders' element={<><Protectedadmin >< Pendingorders /></Protectedadmin></>}></Route>
                                <Route path='/admin/all_orders' element={<><Protectedadmin >< Allorders /></Protectedadmin></>}></Route>
                                <Route path='/admin/books' element={<Protectedadmin ><Books /></ Protectedadmin>}></Route>
                                <Route path='/admin/accpeted_order' element={<Protectedadmin >< Accptedorder/></Protectedadmin>}></Route>
                                <Route path='/admin/rejected_order' element={<Protectedadmin >< Rejectedorder/></Protectedadmin>}></Route>
                                <Route path='/admin/order_details' element={<Protectedadmin >< Orderdetails/></Protectedadmin>}></Route>
                                <Route path='/admin/accept_reject_order' element={<Protectedadmin ><  AcceptReject /></Protectedadmin>}></Route>
                            </Routes>
                        </div></div>
                ) :
                    <Routes>
                        <Route path='/admin/' element={<Login />}></Route>
                        <Route path='/admin/dashboard' element={<><Protectedadmin ><Dashboard /></ Protectedadmin></>} />
                        <Route path='/admin/add_book' element={<><Protectedadmin >< Addbook /></Protectedadmin></>}> </Route>
                        <Route path='/admin/pending_orders' element={<><Protectedadmin >< Pendingorders /></Protectedadmin></>}></Route>
                        <Route path='/admin/all_orders' element={<><Protectedadmin >< Allorders /></Protectedadmin></>}></Route>
                    </Routes>}
            </BrowserRouter>
        </>
    )
}

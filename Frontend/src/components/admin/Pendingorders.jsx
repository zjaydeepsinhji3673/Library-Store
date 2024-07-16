import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Adminlogout, PendingOrderData } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
export default function Pendingorders() {

    const UserData = JSON.parse(localStorage.getItem('User_model'));
    const Admin_name = UserData[0]?.first_name;

    const [orderData, setOrderData] = useState([]);

    const navigate = useNavigate();

    function Logout() {
        Adminlogout().then(r => {
            console.log(r);
            if (r?.code == 1) {
                localStorage.removeItem('User_model');
                toast.success(r?.data);
                navigate('/admin/');
            }
        })
    }

    useEffect(() => {
        PendingOrderData().then(r => {
            if (r?.code == 1) {
                setOrderData(r?.data);
            }
        })
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row mt-2'>
                    <div className='col-6'>
                        <h3>Welcome: {Admin_name}</h3>
                    </div>
                    <div className='col-6 text-end'>
                        <>
                            <button className='btn btn-warning ms-2' onClick={() => Logout()}>Logout</button>
                        </>
                    </div>
                </div>

                <div className='row text-center'>
                    <h3>Pending Orders</h3>
                </div>
                <div className='row mt-2'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Mobile Number</th>
                                <th>Order Number</th>
                                <th>Order Date</th>
                                <th>Total Qty</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.length > 0 ?
                                orderData?.map((v, i) =>
                                    <tr key={i}>
                                        <td>{v?.first_name}</td>
                                        <td>{v?.mobile_number}</td>
                                        <td>{v?.order_number}</td>
                                        <td>{v?.order_date}</td>
                                        <td>{v?.total_item}</td>
                                        <td>{v?.total_amount}</td>
                                        <td>{v?.status}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => navigate('/admin/accept_reject_order', { state: v })}>View Details / Accept & Reject</button>
                                        </td>
                                    </tr>
                                )
                                : (
                                    <tr>
                                        <td colSpan={8} className='text-center'>No Pending Order Found...</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

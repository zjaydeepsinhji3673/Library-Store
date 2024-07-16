import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Adminlogout, acceptOrder, getOrderDetails, rejectOrder } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


export default function AcceptReject() {

    const UserData = JSON.parse(localStorage.getItem('User_model'));
    const Admin_name = UserData[0]?.first_name;

    const navigate = useNavigate();
    const Object = useLocation().state;

    const [orderD, setOrderD] = useState([]);

    function Logout() {
        Adminlogout().then(r => {
            if (r?.code == 1) {
                localStorage.removeItem('User_model');
                toast.success(r?.data);
                navigate('/admin/');
            }
        })
    }

    useEffect(() => {
        getOrderDetails({ order_id: Object.id }).then(r => {
            if (r?.code == 1) {
                setOrderD(r?.data);
            }
        })
    }, [])

    function AcceptOrder(orderid) {
        Swal.fire({
            title: "Are you sure want to accept this order?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                acceptOrder({ order_id: orderid }).then(r => {
                    if (r?.code == 1) {
                        Swal.fire("Order Accpetd Successfully..!", "", "success");
                        navigate('/admin/pending_orders');
                    }
                })
            } else if (result.isDenied) {
              Swal.fire("Order is not Accepted.", "", "info");
            }
          });
    }

    function RejectOrder(orderid) {
         Swal.fire({
            title: "Enter Reject Reason.",
            input: "text",
            inputLabel: "Your Reject Reason",
            inputPlaceholder: "Enter your Reject Reason",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!",
            inputValidator: (value) => {
                if (!value) {
                  return "Reason Message is Requied";
                }
              }
        }).then((result) => {
            if (result.isConfirmed) {
              rejectOrder({ order_id: orderid, reject_reason : result?.value }).then(r => {
                if (r.code == 1) {  
                  Swal.fire({
                    title: "Rejected!",
                    text: "Order Has been Reject Successfully.",
                    icon: "success"
                  });
                  navigate('/admin/pending_orders');
                }
              })
            }
          })
    }
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

                <div className='row'>
                    <div className='col-8'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Product Name</th>
                                    <th>Total Qty</th>
                                    <th>Per Price</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderD.length > 0 ?
                                    orderD.map((v, i) =>
                                        <tr>
                                            <td><img src={v?.thumbnail} style={{ height: '150px', width: '130px' }}></img></td>
                                            <td>{v?.name}</td>
                                            <td>{v?.total_qty}</td>
                                            <td>{v?.price}</td>
                                            <td>{v?.total_price}</td>
                                        </tr>) : (
                                        <tr>
                                            <td colSpan={5}>No Data Found...</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>

                    <div className='col-4'>
                       <div className='row'>
                       <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Values</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>Order No:</td>
                                    <td className='fw-bold'>{Object.order_number}</td>
                                </tr>
                                <tr>
                                    <td>Order Date:</td>
                                    <td className='fw-bold'>{Object.order_date}</td>
                                </tr>
                                <tr>
                                    <td>Total Amount:</td>
                                    <td className='fw-bold'>{Object.total_amount} Rupees</td>
                                </tr>
                            </tbody>
                        </table>
                       </div>
                       <div className='row'>
                           <div className='col-6 text-end'>
                           <button className='btn btn-success' onClick={()=>AcceptOrder(Object.id)}>Accept</button>
                           </div>
                           <div className='col-6 text-start'>
                           <button className='btn btn-danger' onClick={()=>RejectOrder(Object.id)}>Reject</button> 
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}

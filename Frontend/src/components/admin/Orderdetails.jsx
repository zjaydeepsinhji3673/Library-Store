import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Adminlogout, getOrderDetails } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function Orderdetails() {
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
          <h3>Order Details</h3>
        </div>
        <div className='row'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Product Name</th>
                <th>Product Title</th>
                <th>Author</th>
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
                    <td>{v?.title}</td>
                    <td>{v?.author}</td>
                    <td>{v?.total_qty}</td>
                    <td>{v?.price}</td>
                    <td>{v?.total_price}</td>
                  </tr>) : (
                  <tr>
                    <td colSpan={7} className='text-center'>No Data Found...</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

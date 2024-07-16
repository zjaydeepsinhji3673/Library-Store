import React, { useEffect, useState } from 'react'
import { Userlogout, getMyOrderData } from '../../services/home.services';
import { Link, useNavigate } from 'react-router-dom';

export default function Myorder() {
  const [OrderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  function LogOut() {
    Userlogout().then(r => {
      if (r?.code == 1) {
        localStorage.removeItem('User_model');
        navigate('/login');
      }
    })
  }
  useEffect(() => {
    getMyOrderData().then(r => {
      if (r?.code?.toString() === '1') {
        console.log(r?.data);
        setOrderData(r?.data);
      }
    })
  },[])
  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between mt-2'>
          <div className=''>
            <h3>PDF WORLD</h3>
          </div>
          <div className=''>
            <Link to='/home'><button className='btn btn-primary me-2 mb-2'>Home Page</button></Link>
            <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
          </div>
        </div>


        <div className='row mt-2'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Total Item</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Reject Reason</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {OrderData?.length > 0 ?
                OrderData?.map((v, i) =>
                  <tr key={i}>
                    <td>{v?.order_number}</td>
                    <td>{v?.order_date}</td>
                    <td>{v?.total_item}</td>
                    <td>{v?.total_amount}</td>
                    <td>{v?.status}</td>
                    <td>{v?.reject_reason}</td>
                    <td><button className='btn btn-primary' onClick={()=>{navigate('/order_details', {state:v})}}>View Details</button></td>
                  </tr>
                )
                : (
                  <tr>
                    <td colSpan={7}>No Data Found...</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

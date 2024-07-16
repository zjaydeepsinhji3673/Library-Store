import React, { useEffect, useState } from 'react'
import { Adminlogout, AllCount, ListBook, deletebook } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Dashboard() {
  const UserData = JSON.parse(localStorage.getItem('User_model'));
  const Admin_name = UserData[0]?.first_name;
  const [allCount, setAllCount] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    AllCount().then(r=>{
      console.log(r?.data);
      setAllCount(r?.data);
    })
  },[])
  function Logout() {
    Adminlogout().then(r => {
      if (r?.code == 1) {
        localStorage.removeItem('User_model');
        toast.success(r?.data);
        navigate('/admin/');
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
        
        <div className='row mt-2'>
        <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <h1 class="card-subtitle mb-2 ">{allCount[0]?.[0]?.user}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Books</h5>
              <h1 class="card-btitle mb-2 ">{allCount[1]?.[0]?.book}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Orders</h5>
              <h1 class="card-subtitle mb-2">{allCount[2]?.[0]?.All_order}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;', height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Pending Orders</h5>
              <h1 class="card-subtitle mb-2">{allCount[3]?.[0]?.porder}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Rejected Orders</h5>
              <h1 class="card-subtitle mb-2 ">{allCount[4]?.[0]?.rorder}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Accepted Orders</h5>
              <h1 class="card-subtitle mb-2">{allCount[5]?.[0]?.aorder}</h1>
            </div>
          </div>
          </div>

        </div>


      </div>
      <ToastContainer />
    </>
  )
}

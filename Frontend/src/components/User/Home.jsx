import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ItemAddToCart, ListBookUser, Userlogout } from '../../services/home.services';
import Bookdetailsforview from './Bookdetailsforview';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [Username, setUsername] = useState([]);
  const [BookData, setBookData] = useState([]);
  const navigate = useNavigate();
  const [ViewBookInfomodel, setViewBookInfomodel] = useState(false);
  const [bookDataForView, setBookDataForView] = useState([]);

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem('User_model'))
    setUsername(UserData[0]?.first_name)
  }, [])


  useEffect(() => {
    ListBookUser().then(r => {
      if (r?.code == 1) {
        setBookData(r.data);
      }
    })
  }, [])

  function ViewBookInfo(bookinfo) {
    setBookDataForView(bookinfo);
    setViewBookInfomodel(true);
  }
  function closeViewInfoModel() {
    setViewBookInfomodel(false);
  }
  function LogOut() {
    Userlogout().then(r=>{
      if(r?.code == 1){
        localStorage.removeItem('User_model');
        navigate('/login');
      }
    })
  }

  function AddToCart(bookD) {
    let Qty = document.getElementById('qty').value;
    setViewBookInfomodel(false);
    ItemAddToCart({item:Qty,qty:Qty,book_id:bookD?.id}).then(r=>{
      if(r?.code == 1){
        if(r?.message === "warning"){
          toast.info(r?.data);
        }
        else{
          toast.success(r?.data);
        }
      }
    })
  }
  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between mt-2'>
          <div className=''>
            <h3>PDF WORLD</h3>
          </div>
          <div className=''>
            <h3 className='d-inline mt-2 me-2'>Welcome: {Username}</h3>
            <Link to='/cart'><button className='btn btn-primary me-2 mb-2'>Cart</button></Link>
            <Link to='/my_order'><button className='btn btn-primary me-2 mb-2'>My Orders</button></Link>
            <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
          </div>
        </div>

        <div className='row'>
          {BookData?.length > 0 ? (
            <div className='row justify-content-center'>
              {BookData?.map((v, i) => (
                <div className="card col-md-3 m-2" key={i}>
                  <center><Link to={v?.pdf} target='_blank'><img src={v?.thumbnail} className="card-img-top mt-1" alt="..." style={{ height: '250px', width: '200px' }} /></Link></center>
                  <div className="card-body pt-1">
                    <h5>Name: {v?.name}</h5><hr />
                    <h5>Title: {v?.title}</h5><hr />
                    <h5>Author: {v?.author}</h5><hr />
                    <center><button type='button' className='btn btn-success' onClick={() => ViewBookInfo(v)}>View Details</button></center>
                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className='row text-center mt-5'>
              <div className='col-12 alert alert-warning mt-5'>No Book Found</div>
            </div>
          )}
        </div>
      </div>

      {/* { ViewBookInfomodel && <Bookdetailsforview bookinforview={bookDataForView} closeViewInfoModel={closeViewInfoModel} Addtocart={AddToCart}/>} */}
      {/* Book Info For View */}
      {ViewBookInfomodel && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Book Information</h5>
                <button type="button" className="close" onClick={closeViewInfoModel} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <center><img src={bookDataForView?.thumbnail} style={{ height: '300px', width: '250px' }}></img></center>
                <h5>Name: {bookDataForView?.name}</h5>
                <h5>Title: {bookDataForView?.title}</h5>
                <h5>Author: {bookDataForView?.author}</h5>
                <h5>Tags: {bookDataForView?.tag}</h5>
                <h5>Pages Of Book: {bookDataForView?.pageNo}</h5>
                <h3 style={{ color: 'Highlight' }}>Price: {bookDataForView?.price} Rupees.</h3>
                <h5>Qty:<input type='number' min='1' max='10' defaultValue='1' id='qty'></input></h5>
                <center><button className='btn btn-success' onClick={() => AddToCart(bookDataForView)}>Add to Cart</button></center>
              </div>
              <div className="modal-footer">
                <button type="button" className='btn btn-primary' onClick={() => closeViewInfoModel()}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  )
}

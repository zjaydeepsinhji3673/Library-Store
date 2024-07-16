import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductOrder, Userlogout, deleteProduct, getCartData, updateCartd } from '../../services/home.services';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Cart() {

    const [qtyUpdate, setQtyUpdate] = useState(false);
    const [DeletedBook, setIsDelete] = useState(false);
    const [CartData, setCartData] = useState([]);
    const navigate = useNavigate();

    let total = CartData.reduce((sum,item)=>((item.price * item.qty) + sum), 0);
    

    function LogOut() {
        Userlogout().then(r => {
            if (r?.code == 1) {
                localStorage.removeItem('User_model');
                navigate('/login');
            }
        })
    }

    useEffect(() => {
        getCartData().then(r => {
            console.log(r);
            if (r.code == 1) {
                setCartData(r.data);
            }
        })
    }, [DeletedBook,qtyUpdate])

    function RemoveItem(bookid, cartid) {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you Sure Want to Delete this Product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct({ book_id: bookid, cart_id:cartid }).then(r => {
                    if (r.code == 1) {
                        setIsDelete((prev) => !prev);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been Deleted Successfully.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    }

    function OrderNow(PData, Total) {
        ProductOrder({pdata:PData, total:Total}).then(r => {
            if (r.code == 1) {
                toast.success('Thanks For Ordering Book.. Please Check Order Page..');
                navigate('/home');
            }
        })
    }

    function QtyChange(bookid, cartid, qtyvalue){
       updateCartd({book_id:bookid, cart_id:cartid, qty:qtyvalue}).then(r=>{
        if(r?.code == 1){
            setQtyUpdate((prev) => !prev);
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
                        <Link to='/home'><button className='btn btn-primary me-2 mb-2'>Home Page</button></Link>
                        <Link to='/my_order'><button className='btn btn-primary me-2 mb-2'>My Orders</button></Link>
                        <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
                    </div>
                </div>

                {CartData.length > 0 ? (
                    <div className='row mt-2'>
                    <div className='col-8'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Product Name</th>
                                <th>Qty</th>
                                <th>Per Price</th>
                                <th>Total Price</th>
                                <th>remove Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CartData.length > 0 ?
                                CartData.map((v, i) =>
                                    <tr>
                                        <td><img src={v?.thumbnail} style={{height:'100px',width:'100px'}}></img></td>
                                        <td>{v?.name}</td>
                                        <td><input type='number' min={1} max={10} defaultValue={v?.qty} onChange={(e)=>{QtyChange(v?.book_id, v?.cart_id, e.target.value)}}/></td>
                                        <td>{v?.price}</td>
                                        <td>{v?.price * v?.qty}</td>
                                        <td><button type='button' className='btn btn-danger ms-2' onClick={() => RemoveItem(v?.book_id, v?.cart_id)}>Remove Item</button></td>
                                    </tr>) : (
                                    <tr>
                                        <td colSpan={6}>No Data Found...</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    </div>

                    <div className='col-4'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>All Product Price</td>
                                    <td>{total} Rupees</td>
                                </tr>
                                <tr>
                                    <td>Delivery Charges</td>
                                    <td>0.00 Rupees</td>
                                </tr>
                                <tr className='fw-bold'>
                                    <td >Total Amount for Order</td>
                                    <td >{total} Rupees</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className='text-center'><button type='button' className='btn btn-primary' onClick={() => OrderNow(CartData,total)}>Order Now</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                ) : (
                    <div className='row text-center mt-5'>
                        <div className='col-12 alert alert-warning mt-5'>Nothing in Cart..</div>
                    </div>)}
            </div>
        </>
    )
}

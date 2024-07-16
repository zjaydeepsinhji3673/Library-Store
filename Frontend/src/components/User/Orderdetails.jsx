import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Userlogout, getMyOrderDetails } from '../../services/home.services';

export default function Orderdetails() {

    const navigate = useNavigate();
    const Object = useLocation().state;
    console.log(Object);

    const [orderD, setOrderD] = useState([]);

    useEffect(() => {
        getMyOrderDetails({ order_id: Object.id }).then(r => {
            if (r?.code == 1) {
                setOrderD(r?.data);
            }
        })
    }, [])

    function LogOut() {
        Userlogout().then(r => {
            if (r?.code == 1) {
                localStorage.removeItem('User_model');
                navigate('/login');
            }
        })
    }
    console.log(orderD);
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-2'>
                    <div className=''>
                        <h3>PDF WORLD</h3>
                    </div>
                    <div className=''>
                        <Link to='/my_order'><button className='btn btn-primary me-2 mb-2'>My Orders</button></Link>
                        <Link to='/home'><button className='btn btn-primary me-2 mb-2'>Home Page</button></Link>
                        <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
                    </div>
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
                                        <td><img src={v?.thumbnail} style={{height:'150px',width:'130px'}}></img></td>
                                        <td>{v?.name}</td>
                                        <td>{v?.title}</td>
                                        <td>{v?.author}</td>
                                        <td>{v?.total_qty}</td>
                                        <td>{v?.price}</td>
                                        <td>{v?.total_price}</td>
                                    </tr>) : (
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

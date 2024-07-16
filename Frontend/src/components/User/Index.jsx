import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListBookUser } from '../../services/home.services';

export default function Index() {

  const [BookData, setBookData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    ListBookUser().then(r => {
      console.log(r)
      if (r?.code == 1) {
        setBookData(r.data);
      }
    })
  }, [])


  function handleclick(){
    navigate('/login');
  }
  
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-6 mt-2'>
            <h3>PDF WORLD</h3>
          </div>
          <div className='col-6 text-end mt-2'>
            <Link to='/register'><button type='button' className='btn btn-primary me-2'>Register</button></Link>
            <Link to='/login'><button type='button' className='btn btn-primary'>Login</button></Link>
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
                    <center><button type='button' className='btn btn-success' onClick={()=>handleclick()}>Add to Cart</button></center>
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
    </>
  )
}

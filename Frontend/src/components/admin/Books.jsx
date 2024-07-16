import React, { useEffect, useState } from 'react'
import { Adminlogout, ListBook, deletebook } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Books() {

    const UserData = JSON.parse(localStorage.getItem('User_model'));
  const Admin_name = UserData[0]?.first_name;


  const [bookData, setBookData] = useState([]);
  const [DeletedBook, setIsDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ListBook().then(r => {
      if (r?.code == 1) {
        setBookData(r.data);
      }
    })
  }, [DeletedBook])

  function Logout() {
    Adminlogout().then(r => {
      if (r?.code == 1) {
        localStorage.removeItem('User_model');
        toast.success(r?.data);
        navigate('/admin/');
      }
    })
  }

  function DeleteBook(bookid) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you Sure Want to Delete this Book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deletebook({ book_id: bookid }).then(r => {
          if (r.code == 1) {
            setIsDelete((prev) => !prev);
            Swal.fire({
              title: "Deleted!",
              text: "Book has been Deleted Successfully.",
              icon: "success"
            });
          }
        })
      }
    });
  }
  return (
    <>
     <div className='container'>
        <div className='row mt-2'>
          <div className='col-6'>
            <h3>Welcome: {Admin_name}</h3>
          </div>
          <div className='col-6  text-end'>
            <>
              <Link to='/admin/add_book'><button className='btn btn-primary'>Add New Book</button></Link>
              <button className='btn btn-warning ms-2' onClick={() => Logout()}>Logout</button>
            </>
          </div>
        </div>

        <div className='row mt-2'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Title</th>
                <th>Author</th>
                <th>No.of Pages</th>
                <th>Price</th>
                <th>Tags</th>
                <th>PDF</th>
                <th>Added Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookData?.length > 0 ?
                bookData?.map((v, i) =>
                  <tr key={i}>
                    <td><img src={v?.thumbnail} style={{ height: '150px', width: '100px' }}></img></td>
                    <td>{v?.name}</td>
                    <td>{v?.title}</td>
                    <td>{v?.author}</td>
                    <td>{v?.pageNo}</td>
                    <td>{v?.price}</td>
                    <td>{v?.tag}</td>
                    <td><a href={v?.pdf} target="_blank">View Pdf</a></td>
                    <td>{v?.added_date}</td>
                    <td><button className='btn btn-danger' onClick={() => DeleteBook(v?.id)}>Delete</button></td>
                  </tr>
                )
                : (
                  <tr>
                    <td colSpan={9}>No Data Found...</td>
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

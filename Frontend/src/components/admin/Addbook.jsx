import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AddBook, Adminlogout } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';


export default function Addbook() {
    const UserData = JSON.parse(localStorage.getItem('User_model'));
    const Admin_name = UserData[0]?.first_name;

    const { register, handleSubmit, formState: { errors } } = useForm();
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

    const AddNewBook = (data) => {
        const formData = new FormData();
        
        formData.set('name',data?.name);
        formData.set('title',data?.title);
        formData.set('author',data?.author);
        formData.set('tags',data?.tags);
        formData.set('pageNo',data?.pageNo);
        formData.set('price',data?.price);
        formData.set('thumbnail',data?.thumbnail[0]);
        formData.set('pdf',data?.pdf[0]);

        AddBook(formData).then(r=>{
            if(r.code == 1){
                toast.success(r.data);
                setTimeout(()=>{
                    navigate('/admin/dashboard');
                },2000)     
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
                    <h3 className='text-center'>Add New Book Details</h3>
                </div>

                <div className='row'>
                    <form className='border border-primary' onSubmit={handleSubmit(AddNewBook)}>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name of Book</label>
                                    <input type="text" id="name" className="form-control" {...register('name', {
                                        required: 'Please Enter Book Name',
                                        pattern: { value: /^[A-Za-z]+([\s][A-Za-z]+)*[A-Za-z]$/, message: 'Before and After of any text Space is not Allowed, and after any text only 1 Space Allowed.' },
                                    })} placeholder='Enter Book Name' />
                                </div>
                                {/* /^[a-zA-Z ]{3,40}$/ */}
                                <p style={{ color: 'red' }}>{errors.name?.message}</p>
                            </div>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="title">Title of Book</label>
                                    <input type="text" id="title" className="form-control" {...register('title', {
                                        required: 'Please Enter Book Title',
                                        pattern: { value: /^[A-Za-z]+([\s][A-Za-z]+)*[A-Za-z]$/, message: 'Before and After of any text Space is not Allowed, and after any text only 1 Space Allowed.' },
                                    })} placeholder='Enter Book Title' />
                                </div>
                                <p style={{ color: 'red' }}>{errors.title?.message}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="author">Author of Book</label>
                                    <input type="text" id="author" className="form-control" {...register('author', {
                                        required: 'Please Enter Author Name',
                                        pattern: { value: /^[\S]+([\s][\S]+)*[\S]$/, message: 'Before and After of any text Space is not Allowed, and after any text only 1 Space Allowed.' },
                                    })} placeholder='Enter Book Author Name' />
                                </div>
                                <p style={{ color: 'red' }}>{errors.author?.message}</p>
                            </div>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="Thumbnail">Thumbnail of Book</label>
                                    <input type="file" id="thumbnail" className="form-control" accept='.png , .jpg, .jpeg' {...register('thumbnail', {
                                        required: 'Please Select Thumbnail',
                                        validate: (value) => {
                                            const acceptedFormats = ['jpg','png','jpeg'];
                                            const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                                            if (!acceptedFormats.includes(fileExtension)) {
                                                return 'Invalid file format. Only jpg,png,jpeg files are allowed.';
                                            }
                                            return true;
                                        }
                                    })} />
                                </div>
                                <p style={{ color: 'red' }}>{errors.thumbnail?.message}</p>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="tags">Tags of Book</label>
                                    <input type="text" id="tags" className="form-control" {...register('tags', {
                                        required: 'Please Enter Tags',
                                      //  pattern: { value: /^[a-zA-Z #,]$/, message: 'Please Enter Only alphabets and # value will be separated by coma character.' },
                                    })} placeholder='Enter Book Tags' />
                                </div>
                                <p style={{ color: 'red' }}>{errors.tags?.message}</p>
                            </div>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="pdf">PDF of Book</label>
                                    <input type="file" id="pdf" className="form-control" accept='.pdf' {...register('pdf', {
                                        required: 'Please Select File',
                                            validate: (value) => {
                                            const acceptedFormats = ['pdf'];
                                            const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                                            if (!acceptedFormats.includes(fileExtension)) {
                                                return 'Invalid file format. Only PDF files are allowed.';
                                            }
                                            return true;
                                        }
                                    })} />  
                                </div>
                                <p style={{ color: 'red' }}>{errors.pdf?.message}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="pages">No. of Book Pages</label>
                                    <input type="text" id="pages" className="form-control" {...register('pageNo', {
                                        required: 'Please Enter No of Book Pages',
                                        pattern: { value: /^[0-9]*$/, message: 'Please Enter Only Digits' }
                                    })} placeholder='Enter Enter No of Book Pages' />
                                </div>
                                <p style={{ color: 'red' }}>{errors.pageNo?.message}</p>
                            </div>
                            <div className='col-6'>
                                <div className="form-group mt-2">
                                    <label htmlFor="price">Price Book</label>
                                    <input type="text" id="price" className="form-control" {...register('price', {
                                        required: 'Please Enter Book Price',
                                        pattern:{value:/^\d{0,8}(\.\d{1,4})?$/, message:'Max 8 Digit Before decimal point, Max 4 after decimal point'},
                                    })} placeholder='Enter Book Price' />
                                </div>
                                <p style={{ color: 'red' }}>{errors.price?.message}</p>
                            </div>
                        </div>

                        <div className='row text-center mb-2'>
                            <center><button type='submit' className='btn btn-success'>Add Book</button></center>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

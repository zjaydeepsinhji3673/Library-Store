import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { getRegisterUser } from '../../services/home.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const RegisterUser = data => {
    const userdata = {
      first_name: data.fname,
      last_name: data.lname,
      mobile:data.mobile,
      email: data.email,
      password: data.password,
    }
    getRegisterUser(userdata).then(r => {
      if (r.code == 1) {
        console.log(r.data);
        localStorage.setItem('User_model', JSON.stringify(r?.data));
        toast.success('Registration Successfull..');
        setTimeout(() => {
          navigate('/home');
        }, 2000)
      }
      else {
        toast.error(r.data);
      }
    })
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-6 mt-2'>
            <h3>PDF WORLD</h3>
          </div>
          <div className='col-6 text-end mt-2'>
            <Link to='/login'><button type='button' className='btn btn-primary me-2'>Login</button></Link>
          </div>
        </div>
        <div className='row text-center'>
          <h1>Register Here</h1>
        </div>
        <form className='border border-success rounded w-50 mx-auto mt-4 py-4' onSubmit={handleSubmit(RegisterUser)}>

          <div className='row'>
            <div className="form-group col-8 mx-auto">
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" className="form-control" {...register('fname', {
                required: 'Please Enter First Name',
                pattern: { value: /^[a-zA-Z ]{3,20}$/, message: 'Please Enter Only alphabets and length should be between 3 and 20.' },
              })} placeholder='Enter Your First Name' />
              <p style={{ color: 'red' }}>{errors.fname?.message}</p>
            </div>
          </div>
            {/* [a-zA-Z]+\\.? */}
          <div className='row'>
            <div className="form-group col-8 mx-auto">
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" className="form-control" {...register('lname', {
                required: 'Please Enter Last Name',
                pattern: { value: /^[a-zA-Z ]{3,20}$/, message: 'Please Enter Only alphabets and length should be between 3 and 20.' },
              })} placeholder='Enter Your Last Name' />
              <p style={{ color: 'red' }}>{errors.lname?.message}</p>
            </div>
          </div>

          <div className='row'>
            <div className="form-group col-8 mx-auto">
              <label htmlFor="mobile">Mobile Number</label>
              <input type="text" id="mobile" className="form-control" {...register('mobile', {
                required: 'Please Enter mobile Number',
                pattern: { value: /^[0-9\b\+\ \-\(\)]{10,16}$/, message: 'Please Enter Valid Mobile Number and length should be between 10 and 16' },
              })} placeholder='Enter Your Mobile Number' />
              <p style={{ color: 'red' }}>{errors.mobile?.message}</p>
            </div>
          </div>

          <div className='row'>
            <div className="form-group col-8 mx-auto">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" {...register('email', {
                required: 'Please Enter Email',
                pattern: { value: /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Please Enter Valid Email' },
              })} placeholder='Enter Your Email' />
              <p style={{ color: 'red' }}>{errors.email?.message}</p>
            </div>
          </div>

          <div className='row'>
            <div className="form-group col-8  mx-auto">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" {...register('password', {
                required: 'Please Enter Password',
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/, message: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Characte' }
              })} placeholder='Enter Your Password' />
              <p style={{ color: 'red' }}>{errors.password?.message}</p>
            </div>
          </div>

          <div className='row'>
            <div className="form-group col-8  mx-auto">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name='cpassword' placeholder="Confirm Password"  {...register('cpassword', { required: 'Please Enter Confirm Password', validate: (value) => value === watch('password') || "Password do not match" })} />
              <p style={{ color: 'red' }}>{errors.cpassword?.message}</p>
            </div>
          </div>

          <div className='row'>
            <div className="form-group col-8  mx-auto">
              <input className="form-check-input" type="checkbox" style={{ height: '20px', width: '20px', border: '2px solid black' }} value="" id="flexCheckDefault" {...register('select', { required: 'Please Select T&C CkeckBox.' })} />
              <label className="form-check-label" for="flexCheckDefault">&nbsp; I am over Age of 18.&nbsp;</label><Link to="">What Does This Change?</Link>
              <p style={{ color: 'red' }}>{errors.select?.message}</p>
            </div>
          </div>

          <div className='row col-8 mx-auto'>
            <center><button type="submit" className="btn btn-primary mt-3 mb-2">Register</button><br />
              Already Have An Account ?<Link to='/login'> Login Here</Link></center>
          </div>

        </form>
      </div>

      <ToastContainer />
    </>
  )
}

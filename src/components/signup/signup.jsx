import React, { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import {useForm} from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import axios from "axios";
import toast from 'react-hot-toast';

const signup = () => {

  const [formData, setFormData] = useState({

    name:"",
    email:"",
    password:"",
    category:"",

  });

  const handleChangeData = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const navigate = useNavigate();


 const{register, handleSubmit, formState:{errors}
 } = useForm();


 const formSubmit = async () => {
  
  try {
      await axios.post("https://blogserver-6h8s.onrender.com/api/signup", formData)
      toast.success("SignUp Successfully")
      console.log(formData)
      navigate("/mailNotVerified")

  } catch (error) {
    toast.error("Email already exist please login")
    console.log(error.message)
    
  }
 }


 const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <div className='w-screen h-screen flex items-center justify-center bg-[#aaa8a85b]'>

      <div className='w-[100%] h-[100%] flex absolute shadow-lg shadow-[gray]'>

        <div className='w-[580px] h-[100%]  '>
        <img src="young.avif" alt=""  className='w-[100%] h-[100%]'/>
        </div>

        <div className=' w-[100px] h-[100px] absolute left-65 top-27'>
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWVrY2I3NmNoY3ZoazhzYWk2cGYzZ2FhNHZ0cGlhdzM4dmd3OG05ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BtJNNd3woQFCtaWcsN/giphy.gif" alt="" className='w-[100%] h-[100%]'/>
          </div>


        <div className='w-[700px] h-[100%] flex relative bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100'>
            

          <form onSubmit={handleSubmit(formSubmit)} className='w-[450px] h-[380px] absolute left-38 p-5 mt-4 flex flex-col items-center gap-5'>

            
            <div className='w-[400px] flex flex-col text-center mb-5'>
            <h1 className='text-3xl font-bold'>Hello, friends!</h1>
            <h2 className='text-2xl font-bold'> Please <span className='text-[#04049f]'>Sign up</span>  Here!</h2>
            </div>

            <div className='w-[450px] flex items-center gap-2.5 py-1.5 rounded-3xl shadow-xl shadow-[#0000007e] bg-[#91cae1e7]'>
            <label htmlFor='name'></label>
            <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]'><FaUser /></span><input type="text" name='name' placeholder='Enter your name!' className=' w-[300px] h-[30px] border pl-2 outline-none border-none ' {...register("name", { required: true, pattern: /^[A-Za-z]+$/i, minLength: 3 })} onChange={handleChangeData}/>
            </div>

            {errors.name?.type === "required" && (
             <p role="alert" className='w-[340px] h-[30px] text-[red]'>Name is required</p>
             )}



              
             <div className='w-[450px] flex items-center gap-2.5  py-1.5 rounded-3xl  shadow-xl shadow-[#0000007e] bg-[#91cae1e7]'>
             <label htmlFor='email'></label>
             <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]' ><MdEmail /></span><input type='email' name='email' placeholder='Enter your gmail!' className=' w-[300px] h-[30px] border pl-2 outline-none border-none'{...register("email", {required: true, pattern: /^[a-z0-9](\.?[a-z0-9])*@[a-zA-Z]+\.[a-zA-Z]{2,}$/})} onChange={handleChangeData}/>
             </div>
             
            {errors.email?.type === "required" && (
             <p role="alert" className='w-[340px] h-[30px] text-[red]'>Email is required</p>
             )}


              <div className='w-[450px] flex items-center gap-2.5  py-1.5 rounded-3xl  shadow-xl shadow-[#0000007e] bg-[#91cae1e7]'>
              <label htmlFor='password'></label>      
              <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]' ><FaUnlockKeyhole /></span><input type={showPassword ? "text" : "password"} name='password' placeholder='Password at least 8 characters!' className=' w-[300px] h-[30px] border pl-2 outline-none border-none' {...register("password", {required: true,  minLength: 8, pattern:/^.{8,}$/})}  onChange={handleChangeData}/>

              <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye className='text-xl ml-11 cursor-pointer'/> : <FaEyeSlash  className='text-xl ml-11 cursor-pointer'/>}</span>
              
            </div>
      
            {errors.password?.type === "required" && (
             <p role="alert" className='w-[340px] h-[30px] text-[red]'>Password is required</p>
             )}

        <div className='w-[450px] flex items-center gap-4  py-[7px] rounded-3xl  shadow-xl shadow-[#0000007e] bg-[#91cae1e7] pl-2'>
        <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]' ><BiSolidCategory className='text-lg'/></span>
        <label  htmlFor='category' className=' text-md  text-[#444343] flex'>Blog category </label>
        <select className='outline-none pl-2 ml-23' name='category' {...register("category", {required: true})} onChange={handleChangeData}>
          <option>Choose a Category</option>
          <option>Travel blogs</option>
          <option>Sports blogs</option>
          <option>Political blogs</option>
          <option>News blogs</option>
          <option>Food blogs</option>
        </select>

        </div>

        {errors.category?.type === "required" && (
             <p role="alert" className='w-[340px] h-[30px] text-[red]'>Category is required</p>
             )}
        
              <button type='submit' className='w-[270px] shadow-md shadow-[#181010de] py-1.5 rounded-3xl mt-6 cursor-pointer bg-[brown] text-[white]'>CREATE ACCOUNT</button>
              <p>Already have an account?<span><Link to={"/login"} className='text-[#04049f] font-semibold'>Log In</Link></span></p>

            </form>

          </div>

        </div>
      </div>
    </>
  )
}

export default signup 


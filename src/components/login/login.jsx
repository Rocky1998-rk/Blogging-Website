import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const login = () => {

  const{register, handleSubmit, formState:{errors}
   } = useForm();
   
   const navigate = useNavigate();

   const onSubmit = async (data) => {
     console.log(data)
    try {
     const response =  await axios.post("https://blogserver-6h8s.onrender.com/api/login", data)

     const token = response.headers.authorization.split("Bearer ")[1]
     console.log(token)
     localStorage.setItem("token", token)
      toast.success("Login Successfully")
      navigate("/dashBoard")

    } catch (error) {
      // toast.error("Email is not valid, please SignUp ")
      // console.log(error.message)
      const errorMessage = error.response?.data?.message;
      console.log(errorMessage);

      if (errorMessage === "Email not found") {
        toast.error("This email is not registered! please sign up.");
      } else if (errorMessage === "Incorrect password") {
        toast.error("Incorrect password! Please enter the correct password.");
      } else {
        toast.error(errorMessage);
      }
    }
    
   }


   const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <div className='w-screen h-screen flex items-center justify-end '>
      <img src="unsplash.jpg" alt="" className='w-[100%] h-[100%]'/>

       <div className='w-[500px] h-[425px]  mr-10 p-4 pt-7 flex flex-col gap-8 absolute shadow-[gray] shadow-sm bg-[#0d0d0d2f] rounded-2xl '>
        <div className='flex items-center gap-2'>
        <h1 className='text-2xl font-bold'>Log In</h1><MdOutlineLogin className='text-2xl'/>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 '>

          <div className='w-[450px] py-[8px]  flex items-center gap-2 rounded-3xl shadow-lg shadow-[#e3e2e276] bg-[#87cfeb68] relative'>
          <label htmlFor='email'></label>
          <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]'><MdEmail /></span><input type='email' name='email' placeholder='Enter Email' className=' w-[300px] h-[30px]  pl-2 outline-none' {...register("email", {required: true, pattern: /^[a-z][a-z0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/})}/>
          </div>
          {errors.email?.type === "required" && (
             <p role="alert" className='w-[340px] h-[10px] text-[red] absolute top-[138px] left-8'>Email is required</p>
             )}

           <div className='w-[450px] py-[8px]  flex items-center gap-2 rounded-3xl shadow-lg shadow-[#e3e2e276] bg-[#87cfeb68] '>
           <label htmlFor='password'></label>
           <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#80808050] rounded-[50%]'><FaUnlockKeyhole /></span><input type={showPassword ? "text" : "password"} placeholder='Enter Password' name='password' className=' w-[300px] h-[30px]  pl-2 outline-none' {...register("password", {required: true,  minLength: 8, pattern:/^.{8,}$/})}/>
           
           <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye className='text-xl ml-11 cursor-pointer'/> : <FaEyeSlash  className='text-xl ml-11 cursor-pointer'/>}</span>
        </div>

        {errors.password?.type === "required" && (
             <p role="alert" className='w-[340px] h-[10px] text-[red] absolute top-[210px] left-8'>Password is required</p>
             )}
        

        <div className='flex items-center justify-between'> 
        <div className='flex items-center  gap-3'>
          <input type="checkbox" className='w-[20px] h-[20px] accent-black cursor-pointer'/>
          <p className='text-lg'>Remember me</p>
        </div>
           <p className='mr-7'><a href='/email'>Forget Password?</a></p>
        </div>
          
          <div className='flex flex-col items-center justify-center mt-7 gap-2'>

            <button type='submit' className='w-[300px] py-1.5  rounded-3xl bg-[brown] shadow-md shadow-[#2d2d2de1] text-white cursor-pointer'>Log In</button>
            <p>Don't have an account? <span className='text-[green]'><a href='/'>Sign In</a></span></p>
          </div>

          </form>

       </div>
    </div>
      
    </>
  )
}

export default login

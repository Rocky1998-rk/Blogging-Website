import React, { useContext, useState } from 'react'
import { emailContext } from '../emailContext/emailContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const otp = () => {
  const [otp, setOtp]= useState('');
  const {userEmail} = useContext(emailContext);
  
  const handleOtp = async (e) => {
    e.preventDefault();

    try {

       const response = await axios.post('http://localhost:3000/api/verifyOtp', {email:userEmail, otp})
       console.log(response.data)

      if (response.data) {
        toast.success("OTP verify Successfully")
      }

    } catch (error) {
      toast.error("Incorrect OTP")
      console.log(error.message)
    }

  }

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#e0f9c1]'>
      
        <form onSubmit={handleOtp}  className='w-[420px] h-[220px] p-4 flex flex-col gap-1 shadow-xl bg-[#ffffffd8]'>
           <h1 className='text-2xl font-semibold'>OTP Verify Form</h1>
            <label className='text-lg'>Enter your OTP:</label>
            <input type='text' placeholder='Enter OTP' className='pl-4 py-1.5 outline-none rounded-sm bg-[#dad8d8ed]'  onChange={(e) => setOtp(e.target.value)}/>
            <button type='submit' className='border mt-3.5 py-1.5 bg-[#45a049] text-[white] cursor-pointer'>Submit OTP</button>
        </form>
        
    </div>
  )
}

export default otp

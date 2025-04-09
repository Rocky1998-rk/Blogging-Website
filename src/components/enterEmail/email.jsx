import axios from 'axios';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { emailContext } from '../emailContext/emailContext';


const email = () => {
    const{userEmail, setUserEmail} = useContext(emailContext);

    const navigate = useNavigate();


     const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3000/api/otpSend', {email:userEmail});
            console.log(response.data)

            if (response.data) {
                toast.success("OTP sent Successfully")
                navigate("/otp")
            }

        } catch (error) {
            toast.error("Invalid Email")
            console.log(error.message)
        }

     }

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#f9c1c1]'>
      
        <form onSubmit={handleSubmit} className='w-[420px] h-[220px] p-4 flex flex-col gap-1 shadow-xl bg-[#ffffffd8]'>
           <h1 className='text-2xl font-semibold'>Email Validation Form</h1>
            <label htmlFor='email' className='text-lg'>Enter your Email:</label>
            <input type='email' name='email' placeholder='Enter email@gmail.com' className='pl-4 py-1.5 outline-none rounded-sm bg-[#dad8d8ed]' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            <button type='submit' className='border mt-3.5 py-1.5 bg-[#45a049] text-[white] cursor-pointer'>Send OTP</button>
        </form>
        
    </div>
  )
}

export default email

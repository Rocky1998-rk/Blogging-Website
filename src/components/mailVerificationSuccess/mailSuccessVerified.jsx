import React from 'react'

const mailSuccessVerified = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center pt-[120px] gap-6'>

      <div className='w-[150px] h-[150px] '>
        <img src="email-success.png" alt=""  className='w-[100%] h-[100%] rounded-[50%]'/>
      </div>

      <div className='flex flex-col items-center gap-2'>
      <h1 className='text-2xl font-medium'>Email Verified</h1>
      <p className='text-lg text-center'>Your email address was successfully verified!<br/>Please login to continue</p>
      <a href='/login'><button className=' w-lg h-10 bg-[#F08080] text-white text-lg rounded-sm mt-4 cursor-pointer'>Go to Login Page</button></a>
      </div>

    </div>
  )
}

export default mailSuccessVerified

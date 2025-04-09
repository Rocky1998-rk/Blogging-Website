import React from 'react'

const mailNotVerified = () => {
  return (
    <>
    <div className='w-screen h-screen flex'>
        <div className='w-[600px] h-[100%] flex items-center justify-center bg-[#F08080]'>
            <div className='w-[250px] h-[250px]'>
            <img src="https://media.giphy.com/media/oGEys3Jx4NGy4Uvjqi/giphy.gif?cid=790b7611cecutujtb4wxcq6rlcfvilppf7iss51gat9noxos&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" className='w-[100%] h-[100%]'/>
            </div>
          
        </div>
         <div className='w-[660px] h-[100%] flex flex-col items-center justify-center gap-4 p-5 bg-[#f080801a]'>
            <h1 className='text-2xl font-semibold'>Check Your Email inbox!</h1>
            <p className='text-center text-lg font-medium'> 📩 Check Your Email Inbox for a New Message! You have a new message waiting for you in your email inbox! Please check it at your earliest convenience to stay updated and ensure you don’t miss any important information.</p>

        </div>

    </div>
      
    </>
  )
}

export default mailNotVerified

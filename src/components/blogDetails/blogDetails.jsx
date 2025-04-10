import React, { useContext, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../userContext/userContext';

const blogDetails = ({ selectShowBlog }) => {

     const { user } = useContext(userContext);
      const [comment, setComment] = useState("")


    const userId = user?._id;
    const blogId = localStorage.getItem("blogId");
  
    const handleSubmitComment =  async (e) => {
      e.preventDefault();
         try {
         const res = await axios.post(`https://blogserver-6h8s.onrender.com/api/addComment/${userId}/${blogId}`, {comment})
         console.log(res.data)
         toast.success("Comment send Successfully")
         setComment("")
          
        } catch (error) {
          console.log(error.message)
           toast.error("Comment Not Submit")
          
         }
    }
  

  return (
    <>
     <div  className="w-screen h-screen border ">

         <div className='flex flex-col gap-2'>
          <h2 className='text-[30px] font-semibold'>{selectShowBlog?.title}</h2>
          <p className='text-[20px]'>{selectShowBlog?.content}</p>
         </div>
         
    
    
         {/* Add Comment Section */}
    
         <div className='flex flex-col gap-3 mt-10 relative'>
          <h2 className='text-2xl font-semibold'>Add Comment</h2>
    
          <form className='flex flex-col gap-3' onSubmit={handleSubmitComment}>
    
          <textarea className="w-[600px] h-[300px] rounded-lg bg-[#F2F2F2] shadow-sm  resize-none p-3 focus:outline-none " placeholder=" Add Comment..." type='text' value={comment} onChange={(e) => setComment(e.target.value)}/>
          <button type='submit' className='w-[100px] py-1.5 border  rounded-2xl bg-[#E45908] font-semibold text-[white] cursor-pointer'>Submit</button>
    
          </form>
    
         </div>
    
    
    
         {/* Comments Section */}
    
         <div className='w-[100%] h-auto flex flex-col  mt-8'>
          <h2 className='text-xl font-semibold mb-5'>Comments</h2>
    
          <div className='flex gap-2.5'>
          <div className='w-[30px] h-[30px]'>
            <img src={user.profilePic} alt="" className='rounded-[50%]' />
          </div>
            <p className='text-md font-semibold'>John Smith</p>
          </div>
    
            <span className='w-auto'>
              <p className='pl-[50px]'>Hello Nice Blog</p>
            </span>
    
            <div className='flex items-center gap-2  pl-[50px] pt-0.5'>
            <AiFillLike className=' cursor-pointer'/>
            <p>2</p>
            <AiFillDislike  className=' cursor-pointer'/>
            <p>5</p>
            </div>
    
         </div>
            
         
      </div>
        
    </>
  )
}

export default blogDetails

import React, { useContext, useEffect, useState } from 'react'
import { RiFilter3Fill } from "react-icons/ri"
import { FaComments } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../userContext/userContext';



const home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectBlog, setSelectBlog] = useState(false)
  const [selectShowBlog,setSelectShowBlog] = useState()
  const { user } = useContext(userContext);
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState([])
  const [commentCounts, setCommentCounts] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  


  

// const handleShowSelectBlog = async (blog) => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
//   setSelectBlog(true)
//   setSelectShowBlog(blog)


//   try {
//     const res = await axios.get(`http://localhost:3000/api/getComment/${blog._id}`, );
//     console.log("data", res.data)
//     setShowComments(res.data.comments);  
//   } catch (error) {
//     console.error("Error fetching comments:", error.message);
//   }
// }


  useEffect(() => {
    const usersData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/allUserData",)
        if (res?.data?.allUsers?.length > 0) {
              setAllUsers(res?.data?.allUsers)
        } else {
          console.log("No Users Found");
        }
      } catch (error) {
        console.error(error.message);
      }
    }   
    usersData();

  }, []);




  useEffect(() => {
    const commentCounts = async () => {
  
      const counts = {};
      await Promise.all(
        allUsers.flatMap((user) =>
          user.createBlogs.map(async (blog) => {
            try {
              const commentsResponse = await axios.get(`http://localhost:3000/api/getComment/${blog._id}`);
              counts[blog._id] = commentsResponse.data.comments.length || 0;
            } catch {
              counts[blog._id] = 0;
            }
          })
        )
      );
  
      setCommentCounts(counts);
    };
  
    commentCounts();

  }, [allUsers]); 




  const userId = user?._id;
  const blogId = selectShowBlog?._id;

  const handleSubmitComment =  async (e) => {
    e.preventDefault();
       try {
       const res = await axios.post(`http://localhost:3000/api/addComment/${userId}/${blogId}`, {comment})
       console.log(res.data)
       toast.success("Comment send Successfully")
       setComment("")


       setShowComments((prev) => [
        ...prev,
        {
          ...res.data.comment,
          user: {
            name: user.name,
            profilePic: user.profilePic,
          },
        },
      ]);

        
      } catch (error) {

         console.log(error.message)
         toast.error("Comment Not Submit")
        
       }
  }



  
const handleShowSelectBlog = async (blog) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setSelectShowBlog(blog)
  setSelectBlog(true)


  try {

    const res = await axios.get(`http://localhost:3000/api/getComment/${blog._id}`,);
    console.log("getComment", res.data)
    setShowComments(res.data.comments); 

  } catch (error) {
    console.error("Error fetching comments:", error.message);
  }
}

  return (
    <>

      <div className='w-[1235px] h-[610px] m-auto mt-1 '>
           <img src="ttt.avif" alt="" className='w-[100%] h-[100%] rounded-sm'/>
           <div className=' w-[550px] h-[110px] absolute left-7 bottom-[120px] flex  flex-col gap-1.5'>
           <h2 className='text-3xl font-semibold text-white'>Words That Inspire Stories That Matter</h2>
           <p className='text-lg text-white'>Join us on a Journey of Thoughts,Ideas and Creativity. Every Story has the Power to Spark Change.</p>
           </div>
      </div>

      

      <div className='w-[1200px] h-[100px] m-auto flex flex-col justify-center mt-2 p-1'>
        <h2 className='text-2xl font-semibold'>All User Blog</h2>
        <p className='text-lg text-[#757474]'>Here, you can see blogs written by all users. Explore new and trending blogs!</p>
      </div>


      <div className=' w-[1200px] h-[50px] m-auto flex items-center justify-end gap-1 pr-5 mt-2 shadow-sm'>
        <RiFilter3Fill className='text-2xl'/>
        <select className=' outline-none cursor-pointer' onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">Filter</option>
        <option value="Travel Blogs">Travel Blogs</option>
        <option value="Food Blogs">Food Blogs</option>
        <option value="Political Blogs">Political Blogs</option>
        <option value="News Blogs">News Blogs</option>
        </select>
       
      </div>


{/* All User Blog Card */}

<div className='w-[1200px] flex flex-wrap gap-7 m-auto pl-[87px] mb-[50px]'>

{allUsers.length > 0 ? (
  allUsers.map((user) =>
    user.createBlogs.map((blog) =>  (
      <div key={blog._id} className="w-[318px] h-[469px]  flex flex-col gap-2 mt-2 relative">

        <div className="w-[315px] h-[205px]">
          <img
            src={blog.blogImagePath} alt="" className="w-[100%] h-[100%] rounded-[5px] object-cover shadow-md shadow-[#969696]"/>
        </div>

        <div className="w-[315px] h-[255px] p-1.5 flex flex-col gap-1 ">
          <p className="text-sm text-[#494949]">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h2 className="text-[20px] font-semibold">{blog.title}</h2>
          <p className="text-sm text-[#494949] line-clamp-5">{blog.content}</p>
          <p className="w-[100px] py-1 flex items-center justify-center absolute left-[205px] top-2 rounded-2xl bg-[#7d377cda] text-white shadow-lg text-[13px]">
            {blog.category}
          </p>

          <div className='flex items-center justify-end absolute bottom-18 right-4'>
             <button onClick={() => handleShowSelectBlog (blog)} className='text-[11px] text-[#494949] cursor-pointer font-semibold'>Read More...</button>
          </div>

           <div className='flex items-center gap-3'>

          <div className="flex items-center gap-1 mb-1 cursor-pointer">
            <FaComments className="text-[gray]" />
            <p className="text-[gray] cursor-pointer text-[13px]">{commentCounts[blog._id] || 0}</p>
          </div>

          <div className="flex items-center gap-1 mb-1 cursor-pointer">
          <FaEye className="text-[gray]"/>
            <p className="text-[gray] text-[13px]">0</p>
          </div>

          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-[30px] h-[30px]">
            <img src={ user?.profilePic }alt="" className="rounded-[50%]" />
            </div>
            <p className='text-md font-semibold'>{user.name}</p>
          </div>
        </div>
      </div>
    ))
  )

) : (<p>Blog not found</p>

)}

{/* All User Blog Card End */}





{/* Show all user Blog */}

   {selectShowBlog && (

   <div  className={`w-[1150px] h-screen overflow-scroll  absolute top-8 left-[48px] bg-[white] shadow-2xl shadow-[#00000086] p-10 ${selectBlog ? 'block' : 'hidden'}`}>

       <div className='flex gap-5'>
       <div className='w-[500px] h-[500px]'>
        <img src={selectShowBlog.blogImagePath} alt="" className='w-[100%] h-[100%] object-cover rounded-xl' />
       </div>

      <div className='w-[550px] h-[500px] pt-[175px] pl-4 flex flex-col gap-3'>

      <div className='w-[100px] h-[100px]'>
        <img src={allUsers.find(user => user.createBlogs.some(blog => blog._id === selectShowBlog._id))?.profilePic} alt=""  className='rounded-xl'/>
       </div>

       <div className='w-[500px] h-[250px] flex flex-col gap-1 '>
        <h2 className='text-2xl font-semibold'>{allUsers.find(user => user.createBlogs.some(blog => blog._id === selectShowBlog._id))?.name}</h2>
        <h3 className='text-xl font-bold'>Title : {selectShowBlog.title}</h3>
        <p className='text-md font-semibold text-[#605f5f]'>Namaste, dear readers! 🙏 Today's blog title is – [{selectShowBlog.title}]

        Welcome to my blog! Here, you'll find inspiring stories, insightful articles, and engaging content on fascinating topics. I hope this blog broadens your perspective and helps you learn something new. Feel free to share your thoughts and be a part of this journey! ✨</p>
       </div>

      </div>
       </div>


     <div className='flex flex-col gap-2'>
      <h2 className='text-[30px] font-semibold'>{selectShowBlog.title}</h2>
      <p className='text-[20px]'>{selectShowBlog.content}</p>
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

    {showComments.length > 0 ? (showComments.map((comment) => (

      <div key={comment._id} className='flex flex-col gap-2.5'>
       <div className='flex items-center gap-1.5'>
      <div className='w-[30px] h-[30px]'>
        <img src={comment.user?.profilePic} alt="" className='rounded-[50%]' />
      </div>
      <p className='text-md font-semibold'>{comment.user?.name}</p>
      </div>
      <span className='w-auto'>
        <p className='pl-[50px]'>{comment.comment}</p>
      </span>
      <div className='flex items-center gap-2 pl-[50px] pt-0.5'>
        <AiFillLike className='cursor-pointer'/>
        <p>9</p>
        <AiFillDislike className='cursor-pointer'/>
        <p>4</p>
      </div>
    </div>
))
):(

<p>Not Comments</p>

)}

     </div>

  </div>
)} 
</div>

    </>
  );
};

export default home

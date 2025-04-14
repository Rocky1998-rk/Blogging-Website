import React, { useContext, useState } from 'react'
import { IoIosCreate } from "react-icons/io";
import { TbBrandBlogger } from "react-icons/tb";
import { FaComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { RiMenuSearchLine } from "react-icons/ri";
import { userContext } from '../userContext/userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const dashBoard = () => {
const [dropBlog, setDropBlog] = useState(false);
const [readBlog, setReadBlog] = useState(false);
const [showBlog, setShowBlog] = useState();
const { user } = useContext(userContext);
const {setEditBlogData} = useContext(userContext)
const [showProfile, setShowProfile] = useState(false);
const [fileData, setFileData] = useState();
// const [client, setClient] = useState("");

console.log("dashBoard:", user)

  const handleDropBlog = () => {
    setDropBlog(true)
    setShowProfile(false);
    setReadBlog(false)

  }

  const handleProfileSection = () => {
     setShowProfile(true )
     setDropBlog(false);
     setReadBlog(false) 
  }

  const handleReadBlog = (blog) => {
    setReadBlog(true)
    setShowBlog(blog)

  }


  const navigate = useNavigate();


  const handleEditBlog = (blog) => {
    setEditBlogData(blog)
    navigate('/createBlog');

  }



  
  const handleInput = (e) => {
    setFileData(e.target.files[0]);
  }

  const handleUploadFileSubmit = async() => {
        const formData = new FormData();
        formData.append("file", fileData);

        const token = localStorage.getItem("token");
        const { id } = JSON.parse(atob(token.split('.')[1]));

        try {
          const response = await axios.post(`https://blogserver-6h8s.onrender.com/api/uploadProfile/${id}`, formData);
          console.log("UploadedData", response.data)
          toast.success("Profile Upload Successfully")
          
        } catch (error) {
          console.log(error.response.data.message)
          
        }
  }



  const handleDeleteBlog = async (blogId) => {

    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
  
    try {

       await axios.delete(`https://blogserver-6h8s.onrender.com/api/deleteBlog/${blogId}`);
      toast.success("Blog deleted successfully");
  
      // const updatedBlogs = client.createBlogs.filter((blog) => blog._id !== blogId);
      // setClient({ ...client, createBlogs: updatedBlogs });
  
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };


  return (

    
    <div className='h-screen flex flex-wrap'>
                                  
    {/* navbar Section */}

      <div className='w-screen py-3 bg-[#051728]  flex items-center justify-between pr-5 fixed top-0 z-10'>
         <div className='w-[115px] h-[50px] ml-4'>
           <img src="Size.png" alt="" className='w-[100%] h-[100%]'/>
         </div>

           <span className='flex items-center gap-1.5 ml-10'><LuSearch className='w-[24px] h-[24px] text-[white] cursor-pointer'/><input className='text-[white] outline-none pl-3' placeholder='Search...'/></span>


         <nav className='w-[400px] h-[40px]  flex items-center justify-center'>
            <ul className='flex items-center justify-center gap-9 text-[20px] text-[skyblue] font-semibold font-sans'>
              <Link to={'/home'}><li><a href='#' className='hover:text-[white]'>Home</a></li></Link>
               <Link to={'/about'}><li><a href='#' className='hover:text-[white]'>About</a></li></Link> 
                <Link to={'/contact'}><li><a href='#' className='hover:text-[white]'>Contact</a></li></Link>
               <Link to={'/help'}><li><a href='#' className='hover:text-[white]'>Help</a></li></Link>
                
            </ul>
         </nav>
         <div className='flex items-center gap-2.5 '>
          <div>
          <p className='font-sans text-white text-end'>{user.name}</p>
          <p className='font-sans cursor-pointer text-[#03dfcd]'>{user.email}</p>
          </div>
           
            <div className='w-[50px] h-[50px] rounded-[50%] cursor-pointer'>
            <img src={user.profilePic} alt="" className='w-[100%] h-[100%] rounded-[50%]'/>
         </div>
         </div>
            
      </div>


      {/* Sidebar  Section*/}

      <div className='w-[237px] fixed top-[67px] h-screen flex flex-col gap-2 p-6 shadow-xl shadow-[white] bg-[#051728]'>

        <div className=' w-[100%] flex items-center gap-2 pl-0.5 mb-4'>
          <RiMenuSearchLine className='text-[26px] text-white '/>
          <h1 className=' text-lg font-semibold text-[white]'>MENU</h1>
        </div>

        <div className='flex items-center gap-2 bg-[#61bb61f9] pl-2 rounded-sm py-1.5 shadow-xl shadow-[#3131319c] hover:bg-[skyblue]'>
          <IoIosCreate className='text-2xl'/><Link to={'/createBlog'} className='w-[100%]  text-[white] hover:text-black'>Create Blog</Link>
        </div>

        <div className='flex items-center gap-2 bg-[#61bb61f9] pl-2 py-1.5 rounded-sm shadow-xl shadow-[#051728] hover:bg-[skyblue]' onClick={handleDropBlog}>
          <TbBrandBlogger className='text-2xl'/><a href='#' className='w-[100%] text-[white] hover:text-black'>Your Blog</a>
        </div>

        <div className='flex items-center gap-2 bg-[#61bb61f9] pl-2 py-1.5 rounded-sm shadow-xl shadow-[#051728] hover:bg-[skyblue]' onClick={handleProfileSection}>
          <CgProfile  className='text-2xl'/><a href='#' className='w-[100%] text-[white] hover:text-black'>My Profile</a>
        </div>

        <div className='flex items-center gap-2 bg-[#f84545ee] absolute bottom-[100px] pl-2 py-1.5 px-[85px] rounded-sm shadow-xl shadow-[#051728] hover:bg-[#cf1f1fee]'>
          <RiLogoutCircleRLine  className='text-2xl'/><a href='#' className='w-[100%] text-[white] hover:text-black'>Log Out</a>
        </div>

      </div>

       
       {/* Dashboard Welcome Section  */}
        
        <div className='w-[1006px] p-7 flex flex-col gap-2 bg-[#c2e2ef] relative left-[237px]'> 
            <div className='w-[700px] h-[125px] p-5 mt-[70px] flex flex-col gap-2.5 shadow-xl shadow-[#d6d5d572]'>
               <h1 className='text-4xl font-semibold text-[#050578]'>Welcome to the Dashboard <span className='text-[#fd5252]'>"{user.name}"</span></h1>
               <p className='text-[25px] text-[#ed9d08]'>Glad to see you here!!</p>
            </div>

            <div className='w-[500px] h-[350px] ml-[450px] mt-3 shadow-xl shadow-[#d6d5d572]'>
             <img src="dashboard2.png" alt="" className='w-[100%] h-[100%] '/> 
            </div>

        </div> 


      {/* Your Blog Card Section */}
 
        <div className={`w-[1006px] h-auto  flex flex-wrap p-5 gap-2 bg-[#c2e2ef] absolute top-[74px] left-[237px] transition-all duration-600  ${dropBlog ? 'block' : 'hidden'}`}>

        <div className='w-[100%] h-[40px] flex items-center'>
         <h2 className='text-xl font-bold font-sens'>Your Blog</h2>
        </div>


        {user?.createBlogs?.map((blog) => ( 

        <div className='w-[400px] h-[250px] relative flex gap-2 p-3 ml-[55px] mt-2 bg-[#6D276C] rounded-2xl shadow-sm shadow-[#000000f9]'>
        <div className='w-[160px] h-[225px]'>
            <img src={blog.blogImagePath} alt="img" className='w-[100%] h-[100%] rounded-2xl'/>
        </div>

           <div className='w-[218px] flex flex-col gap-0.5'>
              <div className='flex flex-col gap-3'>
              <h2 className='text-[18px] font-semibold font-sans text-[white] line-clamp-1'>{blog.title}</h2>
               <p className='text-[13px] text-justify text-[#e3e2e2] font-normal line-clamp-5'>{blog.content}</p>
               <p className='w-[100px] h-[29px] absolute left-4 top-4 flex items-center  justify-center bg-[#7d377c] rounded-2xl text-[white] text-[13px]'>{blog.category}</p>

               <div className='flex items-center gap-3'>
    
               <span className='flex items-center gap-1 cursor-pointer'>
                <FaComments className='text-[#e3e2e2]'/>
                <p className='text-[13px] text-[#e3e2e2]'>{blog.comments?.length || 0}</p>
               </span>

               <span className='flex items-center gap-1 cursor-pointer'>
                <FaEye className='text-[#e3e2e2]'/>
                <p className='text-[13px] text-[#e3e2e2]'>200</p>
               </span>

               </div>
              </div>
               

               <div className='flex gap-11 mt-3'>
               <button className=' py-1 px-3 bg-[cadetblue] text-[14px] rounded-sm text-white cursor-pointer hover:bg-[#D9EEE1] hover:text-black' onClick={() => handleReadBlog (blog) }>Read more</button>
               <button className=' py-2 px-4 bg-[#D9534F] hover:bg-[red] hover:text-black text-[14px] rounded-sm text-white cursor-pointer'onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
               </div>
           </div>
        </div>

    ))} 
    
      </div>


      {/* My Profile Section */}

      <div className={`w-[1006px] h-screen flex flex-col gap-8  p-7  bg-[#c2e2ef] absolute top-[74px] left-[237px] transition-all duration-600 ${showProfile ? 'block' : 'hidden'}`}>

      <div className='w-[100%] h-[40px] flex items-center'>
         <h2 className='text-xl font-bold font-sens'>My Profile</h2>
        </div>

        <div className='w-[100%] h-[150px] border-[gray] border flex items-center rounded-lg  p-6'>

            <div className='w-[100%]  flex items-center gap-3 '>

             <div className='w-[118px] h-[118px] p-0.5 rounded-[50%] bg-[blue]'>
              <img src={user.profilePic} alt=""  className='rounded-[50%] object-cover'/>
           </div>

             <div>
                <h2 className='text-xl font-semibold'>Chris Martin</h2>
                <p className='text-md font-serif text-[#3f3f3f]'>rohanbisht121@gmail.com</p>
                <p className='text-md text-[#545454]'>Profession-Blogger</p>
             </div>
                 
                 <div className='w-[320px] h-[60px] flex items-center gap-7 ml-[250px]'>
                    <input type='file' accept='image/jpg, image/jpeg, image/png' className=' w-[210px] py-1.5 pl-1.5 border rounded-2xl shadow-lg ' onChange={handleInput}/>
                    <button className='w-[90px] py-1.5 bg-[green] text-[white] cursor-pointer rounded-2xl shadow-lg' onClick={handleUploadFileSubmit}>Upload</button>
                 </div>


             </div>
            
        </div>



        <div className='w-[100%] h-[350px] border-[gray] border  rounded-lg p-5 '>
               <div>
                <h2 className='text-lg font-semibold text-[#5f5f5f]'>Information</h2>
               </div>
        </div>
      </div>




    {/* Read More Blog Section*/}


      {showBlog && (
    <div className={`w-[1006px] h-[2000px] flex flex-col mt-0.5 p-8 scroll-smooth  gap-2 bg-[#D9E8F0] absolute top-[74px] left-[237px] ${readBlog ? 'block' : 'hidden'}`}>

       <div className=' w-[130px] py-2 flex items-center justify-center  absolute top-5 right-3 bg-[green] rounded-lg  shadow-xl' onClick={() => handleEditBlog (showBlog)}>
         <button className='text-lg font-medium cursor-pointer hover:text-[#eceaea]'>Edit Blog</button>
        </div>

        <div className='w-[450px] h-[500px]'>
           <img src={showBlog.blogImagePath} alt="" className='w-[100%] h-[100%] object-cover rounded-3xl shadow-xl'/>
        </div>

       <div className='flex flex-col gap-3 mt-7'>
       <h2 className='text-[30px] font-semibold'>{showBlog.title}...</h2>
        <p className='text-[20px]'>{showBlog.content}</p>
       </div>

    </div>
 )};
    </div>

  );
}; 

export default dashBoard

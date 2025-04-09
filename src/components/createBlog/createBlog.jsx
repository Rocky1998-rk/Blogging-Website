import React, { useContext, useState, useEffect } from 'react'
import { userContext } from '../userContext/userContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const createBlog = () => {


  const { user } = useContext(userContext)
  const {editBlogData, setEditBlogData} = useContext(userContext)
  const [blogData, setBlogData] = useState({
    
    title: "",
    content: "",
    category: "",
    blogImagePath:"",
    
  });
  
  useEffect(() => {
    if (editBlogData) {
        setBlogData(editBlogData);
    }
}, [editBlogData]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prevState => ({...prevState,  [name]: value }));
};

const handleImageChange = (e) => {
  setBlogData((prevData) => ({
    ...prevData,
    blogImagePath: e.target.files[0],
  }));
};


  const handleSavedCreateBlog = async (e) => {
    e.preventDefault();

    // try {

    //   let blogId = "";
    //   let imageUrl = "";

    //     const finalBlogData = {
    //     title: blogData.title,
    //     content: blogData.content,
    //     category: blogData.category,
    //     blogImagePath: imageUrl, 
    //   };

     
    //   if (editBlogData) {
    //      const response =  await axios.put(`http://localhost:3000/api/blogEdit/${editBlogData._id}`, finalBlogData)
    //       toast.success("Edit Blog Successfully")
    //   } else {
        
    //    const response  = await axios.post(`http://localhost:3000/api/blogData/${user._id}`, finalBlogData);
    //    blogId = response.data.blog._id;
    //    toast.success("Created Blog Successfully")
        
    //   }

    //   if (blogData && blogId) {

    //     const formData = new FormData();
    //     formData.append('file', blogData.blogImagePath);

    //     const response = await axios.post(`http://localhost:3000/api/uploadBlogImage/${blogId}`, formData)
    //     imageUrl = response.data.blogImagePath; 
    //     toast.success("UploadBlog Image Successfully")
    //     console.log("UploadedBlogData", imageUrl)


    //   }

    //   setBlogData({
            
    //     title: "",
    //     content: "",
    //     category: "",
    //     blogImagePath:"",

    //  });

    //   setEditBlogData(null);


    // } catch (error) {
    //     toast.error("Edit Blog not Saved");
    //     toast.error("Blog not Created");
    //     toast.error("Blog Image not Saved");
    //     console.log(error.message);
    // }

    try {
      let blogId = "";
      let imageUrl = "";
    
      const finalBlogData = {
        title: blogData.title,
        content: blogData.content,
        category: blogData.category,
        blogImagePath:imageUrl,
      };


    
      // **Edit Blog**
      if (editBlogData) {
        try {
          await axios.put(`http://localhost:3000/api/blogEdit/${editBlogData._id}`, finalBlogData);
          toast.success("Edit Blog Successfully");
        } catch (error) {
          toast.error("Edit Blog not Saved");
          console.log(error.message);
          return; // Agla operation execute hone se roke
        }
      } 


      // **Create New Blog**
      else {
        try {
          const response = await axios.post(`http://localhost:3000/api/blogData/${user._id}`, finalBlogData);
          blogId = response.data.blog._id;
          toast.success("Created Blog Successfully");
        } catch (error) {
          toast.error("Blog not Created");
          console.log(error.message);
          return; // Agla operation execute hone se roke
        }
      }

    
      // **Upload Blog Image**
      if (blogData && blogId) {
        try {
          const formData = new FormData();
          formData.append("file", blogData.blogImagePath);
    
          const response = await axios.post(`http://localhost:3000/api/uploadBlogImage/${blogId}`, formData);
          console.log("res", response.data)
          imageUrl = response.data;
          toast.success("Upload Blog Image Successfully");
          console.log("UploadedBlogData", imageUrl);
        } catch (error) {
          toast.error("Blog Image not Saved");
          console.log(error.message);
          return;
        }
      }
    

      // **Reset Form**
      setBlogData({
        title: "",
        content: "",
        category: "",
        blogImagePath: "",
      });
    
      setEditBlogData(null);
    
    } catch (error) {
      console.log("Unexpected Error: ", error.message);
    }
    

  };

 

  return (
    <>
      <div className='w-screen h-screen bg-[#b2e1f4] p-5 relative'>
          
      <Link to={'/dashboard'}><button className='px-6 py-2.5  absolute right-[30px] rounded-lg bg-[black] text-white text-lg hover:bg-[#ebeaea] hover:text-[black] cursor-pointer shadow-lg'>back to dashBoard</button></Link>

      <div className='flex flex-col gap-1 ml-6'>
        <h1 className='text-3xl font-bold'>{editBlogData ? "EDIT BLOG" : "CRATE BLOG"}</h1>
        <p className='text-xl'><span className='text-[22px] text-[red]'>"Hello {user.name}!</span> Feel free to type something amazing...</p>
      </div>

      <form> 

       <div className='flex items-center gap-5'>
        <div className=' w-[600px] h-[60px] pl-4 ml-8 mt-6 flex items-center rounded-4xl bg-[#f0eeee] shadow-[#8b8b8bfd] shadow-md '>
          <label></label>
          <input type='text' name='title' className=' w-[550px] py-3 pl-2 outline-none rounded-4xl text-xl font-medium bg-[#f0eeee]' placeholder='Title...' value={blogData.title} onChange={handleChange}/>
        </div>

      <div className='w-[200px] h-[59px] mt-6 flex items-center justify-center bg-[#f0eeee] shadow-[#8b8b8bfd] shadow-md  rounded-4xl'>
          <label></label>
          <select className='outline-none text-[16.5px]'name='category' value={blogData.category} onChange={handleChange}>
          <option>Choose a Category</option>
          <option>Travel blogs</option>
          <option>Sports blogs</option>
          <option>Political blogs</option>
          <option>News blogs</option>
          <option>Food blogs</option>
        </select>
        </div>
            
            <div className='w-[300px] h-[60px] pl-4  mt-6 flex items-center rounded-4xl bg-[#f0eeee] shadow-[#8b8b8bfd] shadow-md '>
            <input type='file' accept='image/jpg, image/jpeg, image/png' className=' w-[210px] py-1.5 pl-1.5 rounded-2xl ' onChange={handleImageChange}/>
            </div>



      </div>

        <div className='w-[900px] h-[320px] flex items-center ml-8 mt-4 pl-6 rounded-4xl shadow-[#8b8b8bfd] shadow-md bg-[#d9d7d7dd]'>  
          <label></label>
          <textarea className="rounded-lg w-[850px] h-[300px] p-4 resize-none focus:outline-none text-xl scrollbar-track-bg-gray-200 scrollbar-bg-[gray]" name='content' value={blogData.content} onChange={handleChange} placeholder="Write your blog content here..." />
        </div>



        <div className=' w-[900px] mt-4 ml-8  flex items-center justify-end'onClick={handleSavedCreateBlog}>
            <button type='submit' className='py-2 px-5 bg-[#04a359] text-lg text-[#dedbdb] rounded-xl cursor-pointer hover:bg-[green] hover:text-white shadow-xl'>{editBlogData ? "Save/Edit Blog" : "CREATE BLOG"}</button>
         </div>

         </form>

         

    </div>
    </>
  )
}

export default createBlog











// import React, { useContext, useState, useEffect } from 'react';
// import { userContext } from '../userContext/userContext';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const createBlog = () => {
//   const { user, editBlogData, setEditBlogData } = useContext(userContext);
//   const [previewImage, setPreviewImage] = useState("");
//   const [blogData, setBlogData] = useState({

//     title: "",
//     content: "",
//     category: "",
//     blogImagePath: "",

//   });

//   useEffect(() => {
//     if (editBlogData) {
//       setBlogData(editBlogData);
//       if (editBlogData.blogImagePath && typeof editBlogData.blogImagePath === "string") {
//       setPreviewImage(editBlogData.blogImagePath);
//     }
//     }
//   }, [editBlogData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBlogData(prevData => ({ ...prevData, blogImagePath: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSavedCreateBlog = async (e) => {
//     e.preventDefault();

//     try {
//       let blogId = "";
//       let imageUrl = blogData.blogImagePath;

//       const finalBlogData = {
//         title: blogData.title,
//         content: blogData.content,
//         category: blogData.category,
//         blogImagePath: imageUrl,
//       };

//       if (editBlogData) {
//         const response = await axios.put(`http://localhost:3000/api/blogEdit/${editBlogData._id}`, finalBlogData);
//         blogId = response.data;
//         toast.success("Blog Edited Successfully");
//       } else {
//         const response = await axios.post(`http://localhost:3000/api/blogData/${user._id}`, finalBlogData);
//         blogId = response.data;
//         toast.success("Blog Created Successfully");
//       }

//       if (blogData.blogImagePath && typeof blogData.blogImagePath !== "string") {
//         const formData = new FormData();
//         formData.append('file', blogData.blogImagePath);
//         const response = await axios.post(`http://localhost:3000/api/uploadBlogImage/${blogId}`, formData);
//         imageUrl = response.data.blogImagePath;
//       }

//       setBlogData({ title: "", content: "", category: "", blogImagePath: "" });
//       setPreviewImage(imageUrl);
//       setEditBlogData(null);
//     } catch (error) {
//       toast.error("Error saving blog");
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className='w-screen h-screen bg-[#b2e1f4] p-5 relative'>
//       <Link to={'/dashboard'}>
//         <button className='px-6 py-2.5 absolute right-[30px] rounded-lg bg-black text-white text-lg hover:bg-gray-300 hover:text-black cursor-pointer shadow-lg'>
//           Back to Dashboard
//         </button>
//       </Link>
      
//       <div className='flex flex-col gap-1 ml-6'>
//         <h1 className='text-3xl font-bold'>{editBlogData ? "EDIT BLOG" : "CREATE BLOG"}</h1>
//         <p className='text-xl'>Hello {user.name}, type something amazing...</p>
//       </div>
      
//       <form onSubmit={handleSavedCreateBlog}>
//         <div className='flex items-center gap-5'>
//           <input type='text' name='title' className='input' placeholder='Title...' value={blogData.title} onChange={handleChange} />
//           <select name='category' className='select' value={blogData.category} onChange={handleChange}>
//             <option>Choose a Category</option>
//             <option>Travel blogs</option>
//             <option>Sports blogs</option>
//             <option>Political blogs</option>
//             <option>News blogs</option>
//             <option>Food blogs</option>
//           </select>
//           <input type='file' accept='image/*' className='file-input' onChange={handleImageChange} />
//         </div>
        
//         {previewImage && (
//           <div className='mt-4'>
//             <img src={previewImage} alt='Preview' className='w-40 h-40 object-cover rounded-lg' />
//           </div>
//         )}
        
//         <textarea name='content' className='textarea' value={blogData.content} onChange={handleChange} placeholder='Write your blog content here...' />
        
//         <button type='submit' className='btn'>{editBlogData ? "Save/Edit Blog" : "CREATE BLOG"}</button>
//       </form>
//     </div>
//   );
// };

// export default createBlog;

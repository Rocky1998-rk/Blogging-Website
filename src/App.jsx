import React from 'react'
import Signup from './components/signup/signup';
import Login from './components/login/login';
import DashBoard from './components/dashBoard/dashBoard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MailVerificationSuccess from './components/mailVerificationSuccess/mailSuccessVerified';
import MailNotVerified from './components/checkMail/mailNotVerified';
import Email from './components/enterEmail/email';
import OTP from './components/enterOtp/otp';
import { Toaster } from 'react-hot-toast';
import CreateBlog from './components/createBlog/createBlog'
import Home from './components/Home/home';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Help from './components/help/help';
import BlogDetails from './components/blogDetails/blogDetails';

const App = () => {
  return (
    <div>
      <Toaster position='top-right'/>
      <BrowserRouter>
      <Routes>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/help' element={<Help/>} />
      <Route path='/mailSuccessVerified' element={<MailVerificationSuccess/>}/>
      <Route path='/mailNotVerified' element={<MailNotVerified/>}/>
      <Route path='/email' element={<Email/>}/>
      <Route path='/otp' element={<OTP/>}/>
      <Route path='/createBlog' element={<CreateBlog/>} />
      <Route path='/blogDetails' element={<BlogDetails/>} />
      </Routes>
      </BrowserRouter>
      
     
    </div>
    
  )
}

export default  App

import React from 'react';
import NavBar from '../../components/NavBar';


const aboutUs = () => {
  return (
<>
    <NavBar/>
    <div className='w-full  py-20 flex items-center  justify-center flex-col'>
    <div className="container bg-blue-200 mx-auto p-4">
    <div>
      <h1>Welcome to Job Portal</h1>
      <p>At Job Portal, we are dedicated to connecting job seekers with their dream careers and helping employers find top talent.</p>
      <p>Our mission is to simplify the job search process and provide a seamless experience for both job seekers and employers.</p>
      <p>Whether you are a fresh graduate looking for your first job or an experienced professional seeking new opportunities, Job Portal is here to assist you in finding the perfect match.</p>
      <p>For job seekers, we offer a comprehensive database of job listings across various industries and locations. Our advanced search filters and personalized recommendations ensure that you find the most relevant job opportunities.</p>
      <p>Employers can take advantage of our robust platform to post job openings, manage applications, and efficiently screen candidates. We provide powerful tools and resources to streamline the hiring process and attract the best talent.</p>
      <p>Join Job Portal today and embark on your journey towards success. Let us help you find the right job or the right candidate.</p>
    </div>
    <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
    <p className="mb-2">Email: <a href="mailto:nsmahabalagiri@gmail.com" className="text-blue-500">nsmahabalagiri@gmail.com</a></p>
    <p className="mb-2">Phone: +91 8277406774</p>
    <p className="mb-2">Address: Barkur</p>
    
    <div className="bg-blue-500 text-white py-4 px-6 rounded-md mt-8">
      <p className="text-lg font-semibold">Get in touch with us!</p>
      <p className="text-sm">We'd love to hear from you.</p>
      <a href="mailto:nsmahabalagiri@gmail.com">
          <button className="bg-white text-pink-500 font-semibold py-2 px-4 rounded-md mt-4">Contact Us</button>
        </a>    </div>
  </div>
  </div>
  </>
);
};



export default aboutUs;

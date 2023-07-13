import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import Image from 'next/image';
import { BsFillBookmarkFill } from 'react-icons/bs';
import JobsCard from './JobsCard';
import { useDispatch, useSelector } from 'react-redux';
import { array } from 'joi';
import Select from 'react-select';

export default function Intro() {
  const [search, setSearch] = useState('');
  const jobData = useSelector((state) => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([]);
  const [doneSearch, setDoneSearch] = useState(false);
  const user = useSelector((state) => state.User.userData);
  const [Category, setCategory] = useState('');

  
  const handleSearch = (e) => {
   
    if (e.Category === "company") {
      console.log(e);
      const filteredJobs = jobData?.filter((job) => {
        let x = job?.company;
        return x?.toUpperCase() === search?.toUpperCase().trim();
      });
      setFilteredJobs(filteredJobs);
      setDoneSearch(true);
    }

    if (e.Category === "job_category") {
      console.log(e);
      const filteredJobs = jobData?.filter((job) => {
        let x = job?.job_category;
        return x?.toUpperCase() === search?.toUpperCase().trim();
      });
      setFilteredJobs(filteredJobs);
      setDoneSearch(true);
    }
    if (e.Category === "location") {
      console.log(e);
      const filteredJobs = jobData?.filter((job) => {
        let x = job?.location;
        return x?.toUpperCase() === search?.toUpperCase().trim();
      });
      setFilteredJobs(filteredJobs);
      setDoneSearch(true);
    }
  }
    // } else if (Category === 'company') {
    //   const filteredJobs = jobData?.filter((job) => {
    //     let x = job?.company;
    //     return x?.toUpperCase() === search?.toUpperCase().trim();
    //   });
    //   setFilteredJobs(filteredJobs);
    //   setDoneSearch(true);
   

  const options = [
    { value: 'job_category', label: 'JOB Category' },
    { value: 'company', label: 'Company' },
    { value: 'location', label: 'Location' },

  ];

  return (
    <>
 <div >
                    {
                        user == null ? (
                            <>
                        <div className="bg-cover bg-[url('/wp.jpg')]">
 
                        <div className='w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  '>
                              <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col '>
                                <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>To Choose <span className='text-indigo-600'>Right Jobs.</span> </h1>
                                <p className='md:text-lg sm:text-sm text-xs mb-20 text-black-400'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>
                                <Select onChange={(selectedOption) => setCategory({Category: selectedOption?.value })} placeholder="Please Select search type" options={options} />
                                <div className='w-full mb-4  flex flex-col items-start justify-center'>
                               </div>

<div className='bg-white flex-col mb-6 w-full md:px-4 py-4 flex sm:flex-row items-center justify-center'>
  <BiSearchAlt className='text-2xl text-indigo-600 mx-2 hidden sm:flex' />
  <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Jobs with Job company like marketing ...' className='xs:w-full w-3/4 h-full px-2 bg-gray-200 text-base py-3 outline-none' />
  <button onClick={(e) => handleSearch(Category,e)} className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'>Search</button>
</div>
    <div className=' w-full px-2 py-2 flex items-center justify-start flex-wrap'>
                                  <div className='flex items-center justify-center'>
                                    <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
                                    <h1 className='font-semibold text-lg'>Search By : </h1>
                                  </div>
                                  <div className='flex   items-center justify-center px-4 flex-wrap'>
                                    <p className='px-2  text-black-600'>Category</p>
                                    <p className='px-2  text-black-600'>Salary</p>
                                    <p className='px-2  text-black-600'>Company name</p>
                                  </div>
                                </div>
                              </div>

   
   {/* <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
     <Image width={600} height={700} src="/intro.png" alt="no-image-found" /> */}
   {/* </div> */}
 </div>
 {
   doneSearch && (
     <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
       {
         Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs?.map((job) => {
           return (
             <JobsCard job={job} key={job?._id} />
           )
         }) : <p className='text-sm text-center font-semibold  text-red-500'>Sorry No such Categories Job Available Right Now</p>
       }
     </div>
 
    
   )
 }

</div>
                            </>
                        ) :null
                        
                    }
                </div>

                <div  >
                    {
                        user?.usertype ===  "user" ?(
                            <>         <div className="bg-contain bg-[url('/wp.avif')]">
 

                            <div className='w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  '>
                              <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col '>
                                <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>To Choose <span className='text-indigo-600'>Right Jobs.</span> </h1>
                                <p className='md:text-lg sm:text-sm text-xs mb-20 text-black-400'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>
                                <Select onChange={(selectedOption) => setCategory({Category: selectedOption?.value })} placeholder="Please Select search type" options={options} />
                                <div className='w-full mb-4  flex flex-col items-start justify-center'>
                               </div>

<div className='bg-white flex-col mb-6 w-full md:px-4 py-4 flex sm:flex-row items-center justify-center'>
  <BiSearchAlt className='text-2xl text-indigo-600 mx-2 hidden sm:flex' />
  <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Jobs with Job company like marketing ...' className='xs:w-full w-3/4 h-full px-2 bg-gray-200 text-base py-3 outline-none' />
  <button onClick={(e) => handleSearch(Category,e)} className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'>Search</button>
</div>

                                <div className=' w-full px-2 py-2 flex items-center justify-start flex-wrap'>
                                  <div className='flex items-center justify-center'>
                                    <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
                                    <h1 className='font-semibold text-lg'>Search By : </h1>
                                  </div>
                                  <div className='flex   items-center justify-center px-4 flex-wrap'>
                                    <p className='px-2  text-black-600'>Category</p>
                                    <p className='px-2  text-black-600'>Salary</p>
                                    <p className='px-2  text-black-600'>Company name</p>
                                  </div>
                                </div>
                              </div>
                           
                              
                              {/* <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
                                <Image width={600} height={700} src="/intro.png" alt="no-image-found" /> */}
                              {/* </div> */}
                            </div>
                            {
                              doneSearch && (
                                <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
                                  {
                                    Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs?.map((job) => {
                                      return (
                                        <JobsCard job={job} key={job?._id} />
                                      )
                                    }) : <p className='text-sm text-center font-semibold  text-red-500'>Sorry No such Categories Job Available Right Now</p>
                                  }
                                </div>
                            
                               
                              )
                            }
                           
                           </div>
                                                       </>
                        ):null
                    }
                    </div>
                    <div>
                        {
                        user?.usertype ===  "recruiter"?(
                            <>           <div className="bg-cover bg-[url('/wp2.jpg')]">
 

                            <div className='w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  '>
                              <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col '>
                                <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>To Choose <span className='text-indigo-600'>Right employee.</span> </h1>
                                <p className='md:text-lg sm:text-sm text-xs mb-20 text-black-400'>Find job seekers easily, Make your way easier!</p>
                                
                              </div>
                           
                              
                              {/* <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
                                <Image width={600} height={700} src="/intro.png" alt="no-image-found" /> */}
                              {/* </div> */}
                            </div>
                            {
                              doneSearch && (
                                <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
                                  {
                                    Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs?.map((job) => {
                                      return (
                                        <JobsCard job={job} key={job?._id} />
                                      )
                                    }) : <p className='text-sm text-center font-semibold  text-red-500'>Sorry No such Categories Job Available Right Now</p>
                                  }
                                </div>
                            
                               
                              )
                            }
                           
                           </div>
                                                       </>
                        ):null
                    }
                </div>
                <div>
                        {
                        user?.usertype ===  "admin"?(
                            <>                    
                           <div className="bg-cover bg-[url('/admin.jpg')]">
 

 <div className='w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  '>
   <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col '>
     <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>Handle <span className='text-indigo-600'>Your World</span> </h1>
     <p className='md:text-lg sm:text-sm text-xs mb-20 text-black-400'>Just like a king</p>
     
   </div>
   </div>
   </div>
                                                       </>
                        
                        ):null
                    }
                </div>


   

    </>
  )
}



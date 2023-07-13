import NavBar from '../../components/NavBar'
// import React from 'react'
import {  useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'


import JobsCard from '../../components/JobsCard'





export default function DisplayJobs() {

    const router = useRouter();
    const activeUser = useSelector(state => state?.User?.userData)
    const id = activeUser?._id
  
    useEffect(() => {
      if (!id || !Cookies.get('token')) {
        router.push('/auth/login')
      }
    }, [activeUser, id, Cookies])
  

    const JobData = useSelector(state => state?.Job?.JobData) || [];
    return (
        <>
          <NavBar />
          <div className="bg-cover bg-[url('/background.jpg')]">
            <div className='w-full bg-white-600/70 py-20 flex items-center md:px-8 px-2 justify-center flex-col'>
              <h1 className='px-4 bg-white-600/70 mx-2 py-2 uppercase tracking-wider border-b-2 border text-3xl font-semibold'>Available Jobs</h1>
              <div className='w-full bg-white-600/70 h-full py-4 flex overflow-y-auto items-center justify-center flex-wrap'>
                {/* Filter and map */}
                {Array.isArray(JobData) && JobData.length > 0 ? (
                  JobData.filter(job => job.status === 'approved').map((job) => (
                    <JobsCard job={job} key={job?._id} />
                  ))
                ) : (
                  <p>No approved jobs found</p>
                )}
                {/* Filter and map */}
              </div>
            </div>
          </div>
        </>
      );
      
    
}

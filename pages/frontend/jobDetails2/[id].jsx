import { get_all_jobs_A_details } from '../../../Services/job';
import JobsDataTable from '../../../components/JobsDataTable'
import NavBar from '../../../components/NavBar'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR from 'swr'

export default function TotalJobsDetails() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { id } = router.query;
    const user = useSelector(state => state?.User?.userData)
    const userId = user?._id

    const [Job, setJob] = useState([]);


    useEffect(() => {
        if (!userId || !Cookies.get('token')) {
            router.push('/auth/login')
        }
    }, [user, userId, Cookies])

    const { data, error , isLoading } = useSWR(`/get_all_jobs_A_details`, () => get_all_jobs_A_details(id));
    
     useEffect(() => {
        if(data) setJob(data?.data)
    }, [data])

    if(error) toast.error(error)

    return (
        <>

            {
                isLoading ? (

                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <NavBar />
                        <div className='w-full  pt-20'>
                            <div className='w-full h-20 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col'>
                                <h1 className='text-3xl'>Detail List of  Jobs </h1>
                            </div>
                            <div className='w-full h-full px-4 py-4 flex  overflow-y-auto  items-start justify-center flex-wrap'>
                                <JobsDataTable Job={Job}  />
                            </div>
                        </div>
                    </>
                )

            }

        </>
    )
}

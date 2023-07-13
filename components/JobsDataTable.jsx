import { change_job_status } from '../Services/job';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

export default function JobsDataTable({ Job }) {

    const router = useRouter();


    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(Job)
    }, [Job])




    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])


    const handleAcceptStatus = async (_id) => {
        const data = { _id, status: "approved" }
        const res = await change_job_status(data);
        if (res.success) {
            router.push('/frontend/jobDetails2/$%7Bjob?._id}')
        } else {
            toast.error(res.message)
        }

    }

    const handleRejectStatus = async (_id) => {
        const data = { _id, status: "rejected" }
        const res = await change_job_status(data);
        if (res.success) {
            router.push('/frontend/jobDetails2/$%7Bjob?._id}')
        } else {
            toast.error(res.message)
        }
    }

    const handleDownloadCC = async (name) => {
        const fileUrl = `/uploads/${name}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'cc.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    

    const columns = [
        {
            name: 'Title',
            selector: row => row?.title,
        },
        {
            name: 'Email',
            selector: row => row?.email,
        },
    
      
        {
            name: 'Status',
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p>,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='flex items-center justify-start w-72 h-20'>
                    {/* <button onClick={() => router.push(`/frontend/applicationDetail/${row?._id}`)} className=' w-20 py-2 mx-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700'>Details</button> */}
                    <button onClick={() => handleAcceptStatus(row?._id)} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Approved</button>
                    <button onClick={() => handleRejectStatus(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Rejected</button>
                </div>
            )
        },

    ];




    useEffect(() => {
        if (search === '') {
            setFilteredData(Data);
        } else {
            setFilteredData(Data?.filter((item) => {
                const itemData = item?.user?.name.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }))
        }


    }, [search, Data])


    return (
        <>

            <DataTable
                subHeaderAlign={"right"}
                columns={columns}
                data={filteredData}
                keyField="id"
                pagination
                title={`Total Jobs : ${Data?.length}`}
                fixedHeader
                fixedHeaderScrollHeight='79%'
                selectableRows
                selectableRowsHighlight
                subHeader
                persistTableHead
                subHeaderComponent={
                    <input className='w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600' type={"search"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search with Company  name..."} />
                }
                className="h-screen bg-white"
            />


        </>
    )
}

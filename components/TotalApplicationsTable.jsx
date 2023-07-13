import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

export default function TotalApplicationsTable({ application }) {

    const router = useRouter();


    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(application)
    }, [application])




    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])


 

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
            selector: row => row?.name,
        },
        {
            name: 'Email',
            selector: row => row?.email,
        },
    
        {
            name: 'Gender',
            selector: row => row?.gender,
        },
        {
            name: 'Applied time and date',
            selector: row => row?.createdAt,
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
                keyField="_id"
                pagination
                title={`Total applications : ${Data?.length}`}
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

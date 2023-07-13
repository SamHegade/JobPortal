import NavBar from '../../components/NavBar';
import { profile_form } from '../../Services/job/index';
import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import Cookies from 'js-cookie'



export default function ApplyJob() {
    const router = useRouter()
    const dispatch = useDispatch();
    const { id } = router.query
    const activeUser = useSelector(state => state.User.userData)
    const [formikData, setFormikData] = useState({ name: activeUser?.name,mothername: '',fathername: '', email: activeUser?.email , about: '',qualification:'',address:'',dob:'',gender:'',marks:'',year:'', cv: '' ,user: activeUser?._id })
    const [file, setFile] = useState(null)
    const [error, setError] = useState({ name: '',mothername: '',fathername: '', email: "", about: '',qualification:'',address:'',dob:'',gender:'', marks:'',year:'', cv: '',user: '' });


    const { name,mothername,fathername ,email, about,  user,qualification,address,gender,dob ,marks,year,cv} = formikData;


    // const activeUser = useSelector(state => state?.User?.userData)
    const id1 = activeUser?._id
  

    useEffect(() => {
        if (!id1 || !Cookies.get('token')) {
          router.push('/auth/login')
        }
      }, [activeUser, id1, Cookies])
    
      
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user) {
            return toast.error('Please Login First')
        }

        if (!name) {
            setError({ ...error, name: "Name Field is required" })
            return;
        }
        if (!mothername) {
            setError({ ...error, mothername: "mothername Field is required" })
            return;
        }

        if (!fathername) {
            setError({ ...error, fathername: "fathername Field is required" })
            return;
        }

        if (!address) {
            setError({ ...error, address: "address Field is required" })
            return;
        }


        if (!email) {
            setError({ ...error, email: "Email Field is required" })
            return;
        }

        

     
        if (!about) {
            setError({ ...error, about: "About Field is required" })
            return;
        }

        if (!file) {
            setError({ ...error, cv: "Please Upload CV" })
            return;
        }


        if (!qualification) {
            setError({ ...error, qualification: "qualification Field is required" })
            return;
        }
        
        if (!marks) {
            setError({ ...error, marks: "marks Field is required" })
            return;
        }
        if (!year) {
            setError({ ...error, year: "year Field is required" })
            return;
        }


        if (!dob) {
            setError({ ...error, dob: "dob Field is required" })
            return;
        }


        if (!gender) {
            setError({ ...error, gender: "gender Field is required" })
            return;
        }

        // Check if the file type is PDF
        if (file.type !== 'application/pdf') {
            setError({ ...error, cv: "Please Upload a PDF file" })
            return;
        }




        const form = new FormData();
        form.append('name', name);
        form.append('mothername', mothername);
        form.append('fathername', fathername);
        form.append('email', email);
        form.append('about', about);
        form.append('address', address);

        form.append('qualification', qualification);
        form.append('dob', dob);
        form.append('gender', gender);
        form.append('user', user);
        form.append('cv', file);
        form.append('marks', marks);
        form.append('year', year);


        const res = await profile_form(form);
        if (res.success) {
            toast.success('Your Application is Submitted , Redirecting ... ')
            setTimeout(() => {
                router.push('/')
            }, 1000);

        } else {
            toast.error('Something Went Wrong')
        }



    }

    const options = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ]



    return (
        <>
            <NavBar />
            <div className="bg-cover bg-[url('/wp2.jpg')]">
 
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Your Info</h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="name" className='mb-1 text-base font-semibold'>Name :</label>
                        <input name='name' value={name} onChange={(e) => setFormikData({ ...formikData, name: e.target.value })} type="text" id='name' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Name ' />
                        {
                            error.name && <p className="text-sm text-red-500">{error.name}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="mothername" className='mb-1 text-base font-semibold'>Mothername :</label>
                        <input name='mothername' onChange={(e) => setFormikData({ ...formikData, mothername: e.target.value })} type="text" id='mothername' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter MotherName ' />
                        {
                            error.mothername && <p className="text-sm text-red-500">{error.mothername}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="fathername" className='mb-1 text-base font-semibold'>FatherName :</label>
                        <input name='fathername' onChange={(e) => setFormikData({ ...formikData, fathername: e.target.value })} type="text" id='fathername' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter FatherName ' />
                        {
                            error.fathername && <p className="text-sm text-red-500">{error.fathername}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="address" className='mb-1 text-base font-semibold'>Address :</label>
                        <input name='address' onChange={(e) => setFormikData({ ...formikData, address: e.target.value })} type="text" id='address' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Address ' />
                        {
                            error.address && <p className="text-sm text-red-500">{error.address}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justerify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input name='email' value={email} disabled type="email" id='email' className='w-full  py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                    <label htmlFor="qualification" className='mb-1 text-base font-semibold'>qualification :</label>
                        <input name='qualification' onChange={(e) => setFormikData({ ...formikData, qualification:  e.target.value })} type="qualification" id='qualification' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter qualification ' />
                        {
                            error.qualification && <p className="text-sm text-red-500">{error.qualification}</p>
                        }  
                    </div>


                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="marks" className='mb-1 text-base font-semibold'>Passing marks :</label>
                        <input name='marks' onChange={(e) => setFormikData({ ...formikData, marks: e.target.value })} type="text" id='marks' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Marks/percentage' />
                        {
                            error.marks && <p className="text-sm text-red-500">{error.marks}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="year" className='mb-1 text-base font-semibold'>Passing year :</label>
                        <input name='year' onChange={(e) => setFormikData({ ...formikData, year: e.target.value })} type="text" id='year' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Ending year' />
                        {
                            error.year && <p className="text-sm text-red-500">{error.year}</p>
                        }
                    </div>
<div className='w-full mb-4 flex flex-col items-start justify-center'>
  <label htmlFor="dob" className='mb-1 text-base font-semibold'>Date Of Birth:</label>
  <input
    onChange={(e) => {
      const inputDate = new Date(e.target.value);
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      
      if (inputDate > eighteenYearsAgo) {
        // Date is less than 18 years ago, show error
        setFormikData({ ...formikData, dob: e.target.value });
        setError({ dob: "Must be 18 years or older" });
      } else {
        // Date is valid, clear error
        setFormikData({ ...formikData, dob: e.target.value });
        setError({ dob: "" });
      }
    }}
    type="date"
    id='dob'
    className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded'
    placeholder='Enter Date of birth'
  />
  {
    error.dob && <p className="text-sm text-red-500">{error.dob}</p>
  }
</div>

                    <Select onChange={(selectedOption) => setFormikData({ ...formikData, gender: selectedOption?.value })} placeholder="Please Select gender type" options={options} />
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        {
                            error.gender && <p className="text-sm text-red-500">{error.gender}</p>
                        }
                    </div>

                    {/* <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>Salary :</label>
                        <input onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Salary for this job' />
                        {
                            error.salary && <p className="text-sm text-red-500">{error.salary}</p>
                        }
                    </div> */}


                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>About :</label>
                        <textarea name='about' onChange={(e) => setFormikData({ ...formikData, about: e.target.value })} type="description" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description' />
                        {
                            error.about && <p className="text-sm text-red-500">{error.about}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="file" className='mb-1 text-base font-semibold'>Upload CV :</label>
                        <input accept="application/pdf" name='cv' onChange={(e) => setFile(e.target.files[0])} type="file" id='file' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {
                            error.cv && <p className="text-sm text-red-500">{error.cv}</p>
                        }
                    </div>
                    <Link href="frontend/profileshow">
      <a className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest">Button Text</a>
    </Link>

                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            </div>
            <ToastContainer />
        </>
    )
}

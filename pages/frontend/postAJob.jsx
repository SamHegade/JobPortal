import NavBar from '../../components/NavBar'
import Select from 'react-select'
import React, { useEffect,useState , ChangeEvent} from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '../../Services/job';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'



export default function PostAJob() {
    const user = useSelector(state => state.User.userData)
    const router = useRouter();
    // const [job_cc, setCc] = useState(null)

    const [formData, setFormData] = useState({ user: user?._id, title: "", salary: 0, email: "", company: "", description: "", job_category: "",location:"", job_type: "",job_cc:'', job_experience: "", job_vacancy: 0, job_deadline: "" });
    const [error, setError] = useState({ user: "", title: "", salary: "", email: "", company: "", description: "", job_category: "",location:"", job_type: "", job_cc:'',job_experience: "", job_vacancy: "", job_deadline: "" });

    const activeUser = useSelector(state => state?.User?.userData)
    const id = activeUser?._id
  
    useEffect(() => {
      if (!id || !Cookies.get('token')) {
        router.push('/auth/login')
      }
    }, [activeUser, id, Cookies])
  


    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!formData.title) {
            setError({ ...error, title: "title Field is required" })
            return;
        }

        if (!formData.salary) {
            setError({ ...error, salary: "salary Field is required" })
            return;
        }

        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" })
            return;
        }


        if (!formData.company) {
            setError({ ...error, company: "company Field is required" })
            return;
        }
        if (!formData.description) {
            setError({ ...error, description: "description Field is required" })
            return;
        }
        if (!formData.job_category) {
            setError({ ...error, job_category: "job_category Field is required" })
            return;
        }
        if (!formData.location) {
            setError({ ...error, location: "location Field is required" })
            return;
        }
        if (!formData.job_type) {
            setError({ ...error, job_type: "job_type Field is required" })
            return;
        }
        if (!formData.job_experience) {
            setError({ ...error, job_experience: "job_experience Field is required" })
            return;
        }
        if (!formData.job_vacancy) {
            setError({ ...error, job_vacancy: "job_vacancy Field is required" })
            return;
        }
        if (!formData.job_cc) {
            setError({ ...error, job_type: "certificate Field is required" })
            return;
        }

        if (!formData.job_deadline) {
            setError({ ...error, job_deadline: "job_deadline Field is required" })
            return;
        }

        if (formData.user == null) {
            return toast.error("Please Login First");
        }
       

        const res = await post_job(formData);
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
        else {
            toast.error(res.message);
        }
    }

    function handleDateChange(event) {
        const inputDate = event.target.value;
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date in the YYYY-MM-DD format
      
        if (inputDate < currentDate) {
          setError({ ...error, job_deadline: "Deadline must be a future date" });
        } else {
          setError({ ...error, job_deadline: "" });
          setFormData({ ...formData, job_deadline: inputDate });
        }
      }

    const options = [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'internship', label: 'Internship' },
        { value: 'contract', label: 'Contract' },
    ]






    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Job Details</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Title :</label>
                        <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter title of job' />
                        {
                            error.title && <p className="text-sm text-red-500">{error.title}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>Salary/month :</label>
                        <input onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Salary for this job' />
                        {
                            error.salary && <p className="text-sm text-red-500">{error.salary}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email to be Contacted for this job' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>Company :</label>
                        <input onChange={(e) => setFormData({ ...formData, company: e.target.value })} type="text" id='company' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Company of job' />
                        {
                            error.company && <p className="text-sm text-red-500">{error.company}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>Description :</label>
                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} onResize={"none"} type="text" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description of job' />
                        {
                            error.description && <p className="text-sm text-red-500">{error.description}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobCategory" className='mb-1 text-base font-semibold'>Job Category :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_category: e.target.value })} type="text" id='jobCategory' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Category of job' />
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="location" className='mb-1 text-base font-semibold'>location :</label>
                        <input onChange={(e) => setFormData({ ...formData, location: e.target.value })} type="text" id='location' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter location of job' />
                        {
                            error.location && <p className="text-sm text-red-500">{error.location}</p>
                        }
                    </div>

                    <Select onChange={(e) => setFormData({ ...formData, job_type: e.value })} placeholder="Please Select Job type" options={options} />
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobExperience" className='mb-1 text-base font-semibold'>Job Experience :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_experience: e.target.value })} type="text" id='jobExperience' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Experience Required for this job' />
                        {
                            error.job_experience && <p className="text-sm text-red-500">{error.job_experience}</p>
                        }
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
    <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Job Vacancy :</label>
    <input
        onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 0) {
                setFormData({ ...formData, job_vacancy: value });
            }
        }}
        type="number"
        id='jobva'
        className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded'
        placeholder='Enter Number of Vacancies'
    />
    {
        error.job_vacancy && <p className="text-sm text-red-500">{error.job_vacancy}</p>
    }
</div>

                    {/* <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Job Deadline :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_deadline: e.target.value })} type="date" id='jobva' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Deadline of job' />
                        {
                            error.job_deadline && <p className="text-sm text-red-500">{error.job_deadline}</p>
                        }
                    </div> */}

<div className='w-full mb-4  flex flex-col items-start justify-center'>
  <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Job Deadline :</label>
  <input onChange={handleDateChange} type="date" id='jobva' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Deadline of job' />
  {error.job_deadline && <p className="text-sm text-red-500">{error.job_deadline}</p>}
</div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobcc" className='mb-1 text-base font-semibold'>Upload authorization Certificate of company :</label>
                        <input accept="job_cc/pdf" name='jobcc' onChange={(e) => setFormData({ ...formData, job_cc: e.target.value })}type="file" id='job_cc' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {
                            error.job_cc && <p className="text-sm text-red-500">{error.cc}</p>
                        }
                    </div>

                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
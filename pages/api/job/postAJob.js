import ConnectDB from '../../../DB/connectDB';
import validateToken from '../../../middleware/tokenValidation';
import Job from '../../../models/Job';
import Joi from 'joi';


const schema = Joi.object({
    user: Joi.required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.number().required(),
    company: Joi.string().required(),
    email: Joi.string().email().required(),
    job_category: Joi.string().required(),
    location: Joi.string().required(),

    job_type: Joi.string().required(),
    job_experience: Joi.string().required(),
    job_vacancy: Joi.number().required(),
    job_cc:Joi.string().required(),
    job_deadline: Joi.date().required(),

});


export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'POST':
            await validateToken(req, res, async () => {
                await postAJob(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const postAJob =  async (req, res) => {
    await ConnectDB();
    
    // const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         console.error('Error', err)
    //         throw err
    //     }

    //     const oldPath = files.job_cc.filepath;
    //     const originalFileName  = files.job_cc.originalFilename
        


    //     const fileExtension = path.extname(originalFileName);
    //     const randomString = crypto.randomBytes(6).toString('hex');
    //     const fileName = `${originalFileName.replace(fileExtension, '')}_${randomString}${fileExtension}`;


    //     const newPath = path.join(process.cwd(), 'public', 'uploads', fileName);


    //     // Read the file
    //     fs.readFile(oldPath, function (err, data) {
    //         if (err) throw err;
    //         fs.writeFile(newPath, data, function (err) {
    //             if (err) throw err;
    //         });
    //         fs.unlink(oldPath, function (err) {
    //             if (err) throw err;
    //         });
    //     });
    // })
    const data = req.body;
    const { user ,title,description , salary , company , email , job_category ,location, job_type , job_experience , job_vacancy ,job_cc, job_deadline } = data;
    const { error } = schema.validate({ user ,title,description , salary , company , email , job_category ,location,job_type , job_experience , job_vacancy ,job_cc, job_deadline });

    if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const creatingUser =  await Job.create({user,title,description , salary , company , email , job_category ,location, job_type , job_experience , job_vacancy ,job_cc, job_deadline });
        return res.status(200).json({ success: true, message: "Job Posted Successfully !" })
    } catch (error) {
        console.log('Error in posting a job (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry login !" })
    }
}

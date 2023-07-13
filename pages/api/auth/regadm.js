import ConnectDB from '../../../DB/connectDB';
import Author from '../../../models/Author';
import Joi from 'joi';
import { hash } from 'bcryptjs';


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required()
});


export default async (req, res) => {
    await ConnectDB();

    const { email, password, name } = req.body;
    const { error } = schema.validate({ email, password, name });

    if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const ifExist = await Author.findOne({ email });
        
        if (ifExist) {
            return res.status(406).json({ success: false, message: "Admin Already Exist" });
        }

        else {
            const hashedPassword = await hash(password, 12)
            const createAuthor = await Author.create({ email, name, password: hashedPassword });
            return res.status(201).json({ success: true, message: "Account created successfully" });
        }
    } catch (error) {
        console.log('Error in register (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry Later !!!" })
    }
}


import ConnectDB from '../../../DB/connectDB';
// import Author from '../../../models/Author';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User'


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});




export default async (req, res) => {
    await ConnectDB();

    const { email, password } = req.body;
    // console.log(typeof(req.body))
    const { error } = schema.validate({ email, password });

    if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {


        // const checkUser = await User.findOne({ email });
        // if (!checkUser) return res.status(401).json({ success: false, message: "Account not Found" });

        // const isMatch = await compare(password, checkUser.password);
        // if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect Password" });

        // const token = jwt.sign({ id: checkUser._id, email: checkUser.email }, process.env.JWT_SECREAT, { expiresIn: '1d' });
        // const finalData = {token , user : checkUser}
        // return res.status(200).json({ success: true, message: "Login Successfull",  finalData})

        const checkAuthor = await User.findOne({ email });
        if (!checkAuthor) return res.status(401).json({ success: false, message: "Account not Found" });

        const isMatch = await compare(password, checkAuthor.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect Password" });

        const token = jwt.sign({ id: checkAuthor._id, email: checkAuthor.email }, process.env.JWT_SECREAT, { expiresIn: '1d' });
        const finalData = {token , Author : checkAuthor}
        return res.status(200).json({ success: true, message: "Login Successfull",  finalData})

    } catch (error) {
        console.log('Error in login  admin (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry Later !" })
    }
}

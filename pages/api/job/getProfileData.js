import ConnectDB from '../../../DB/connectDB';
import validateToken from '../../../middleware/tokenValidation';
import Profiles from '../../../models/Profile';


export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await validateToken(req, res, async () => {
                await getProfileData(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const getProfileData =  async (req, res) => {
    await ConnectDB();
    const data = req.query;
    const id = data?.id

    if(!id) return res.status(400).json({ success: false, message: "Please Login" })

    try {
        const gettingProfiles = await Profiles.find({user : id}).populate('user', 'name email');
        return res.status(200).json({ success: true, data: gettingProfiles })
    } catch (error) {
        console.log('Error in getting a specifed profile (server) => ', error);
        return res.status(403).json({ success: false, message: "Something Went Wrong Please Retry login !" })
    }
}
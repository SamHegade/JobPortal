import mongoose from 'mongoose';
import User from './User';
import Job from './Job';
import { number } from 'joi';

const ApplyJobSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    name: {
        type: String,
        required: true,
    },
    mothername: {
        type: String,
        required: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    cv: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    marks: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected']
    }
}, { timestamps: true });

const AppliedJob = mongoose.models.AppliedJobStatus || mongoose.model('AppliedJobStatus', ApplyJobSchema);

export default AppliedJob;
import mongoose from 'mongoose';
import User from './User';
import Job from './Job';
import { number } from 'joi';

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

const profiles = mongoose.models.profileStatus || mongoose.model('profileStatus', ProfileSchema);

export default profiles;
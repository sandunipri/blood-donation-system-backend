import mongoose  from "mongoose";

const adminModel = new mongoose.Schema({
    "name": {
        required: true,
        type: String,
    },
    "password": {
        required: true,
        type: String,
        select: false
    },
    "email": {
        required: true,
        type: String,
        unique: true
    },
    "nic": {
        required: true,
        type: String,
        unique: true
    },
    "role": {
        required: true,
        type: String,
        enum: ['admin']
    },
    "phone": {
        required: true,
        type: String
    }
})

const Admin = mongoose.model('Admin', adminModel);
export default Admin;

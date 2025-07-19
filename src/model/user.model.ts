import mongoose  from "mongoose";

const userModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        nic: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['donor', 'recipient', 'hospital'],
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
);

const User = mongoose.model('User', userModel);
export default User;
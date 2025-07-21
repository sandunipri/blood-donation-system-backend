import mongoose from "mongoose";

const BloodStockSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    }
});

export default BloodStockSchema;

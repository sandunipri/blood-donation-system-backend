import mongoose from "mongoose";

const BloodStockSchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    units: {
        type: Number,
        required: true,
        min: 0,
    }
});

export default BloodStockSchema;

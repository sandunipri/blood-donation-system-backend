import mongoose from 'mongoose';

const BloodRequestSchema = new mongoose.Schema({
    requesterName: {
        type: String,
        required: true,
    },
    requesterEmail: {
        type: String,
        ref: "user",
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    unitsNeeded: {
        type: Number,
        required: true,
        min: 1,
    },
    hospitalEmail: {
        type: String,
        ref: "hospital",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    neededDate: {
        type: Date,
        required: true,
    },
    }
);

export default mongoose.model('BloodRequest', BloodRequestSchema);


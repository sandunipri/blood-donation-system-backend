import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
        donorEmail: {
            type: String,
            ref: "user",
            required: true,
        },
        hospitalEmail: {
            type: String,
            ref: "hospital",
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        donationDate: {
            type: Date,
            default: Date.now,
        },
        unitsDonated: {
            type: Number,
        },
}
);

export default mongoose.model('Donation', donationSchema);

import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
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
        quantity: {
            type: Number,
            default: 450,
        },
}
);

export default mongoose.model('Donation', donationSchema);

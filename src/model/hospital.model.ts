import BloodStockSchema from "./bloodstock.model";
import mongoose from "mongoose";

const HospitalSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    bloodStock: {
        type: [BloodStockSchema],
        default: [],
    },

});

export const Hospital = mongoose.model("Hospital", HospitalSchema);

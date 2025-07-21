import {HospitalDto} from "../dto/hospital.dto";
import {Hospital} from "../model/hospital.model";
import { Document } from "mongoose";

export const addHospital = async (hospital : HospitalDto): Promise<Document> =>{
    return await Hospital.create(hospital);
}

export const validateHospital = (hospital: HospitalDto) => {
    if (!hospital.name || !hospital.location || !hospital.contact || !hospital.email) {
        return 'All fields are required';
    }
    return null;
}
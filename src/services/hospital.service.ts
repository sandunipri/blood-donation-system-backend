import {HospitalDto} from "../dto/hospital.dto";
import {Hospital} from "../model/hospital.model";
import { Document } from "mongoose";
import {BloodStock} from "../dto/bloodstock.dto";

export const findHospitalByEmail = async (email: string) => {
    return Hospital.findOne({email: email.toLowerCase()});
};

export const addHospital = async (hospital : HospitalDto): Promise<Document> =>{
    return await Hospital.create(hospital);
}

export const validateHospital = (hospital: HospitalDto) => {
    if (!hospital.name || !hospital.location || !hospital.contact || !hospital.email) {
        return 'All fields are required';
    }
    return null;
}

export const getAllHospitals = async (): Promise<HospitalDto[]> => {
    return Hospital.find();
}

export const getAllBloodStocks = async (): Promise<BloodStock[]> => {
    const hospitals = await Hospital.find({}, "bloodStock");

    const allStocks = hospitals.flatMap(hospital => hospital.bloodStock);

    const allBloodStock = allStocks.reduce<BloodStock[]>((blood, stock) => {
        const existing = blood.find(item => item.bloodGroup === stock.bloodGroup);
        if (existing) {
            existing.units += stock.units;
        } else {
            blood.push({
                bloodGroup: stock.bloodGroup as BloodStock["bloodGroup"],
                units: stock.units,
            });
        }
        return blood;
    }, []);
    return allBloodStock;
};




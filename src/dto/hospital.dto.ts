import {BloodStock} from "./bloodstock.dto";

export interface HospitalDto {
    name: string;
    location: string;
    contact: string;
    email: string;
    bloodStock: BloodStock[];
}
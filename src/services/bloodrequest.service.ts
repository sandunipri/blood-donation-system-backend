import {BloodRequestDto} from "../dto/bloodrequest.dto";
import BloodRequestSchema from "../model/bloodrequest.model";
import { Document } from "mongoose";

export const requestBlood = async (bloodRequest: BloodRequestDto): Promise<Document> => {
    return await BloodRequestSchema.create(bloodRequest);
}
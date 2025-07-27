import {DonationRecordDto} from '../dto/donation.dto';
import Donation from "../model/donation.model";
import { Document } from "mongoose";

export const donateBlood = async ( donationRecord : DonationRecordDto): Promise<Document> => {
    return await Donation.create(donationRecord);

}

export const validateDonation = (donation: DonationRecordDto) => {
    if (!donation.donorEmail || !donation.hospitalEmail || !donation.bloodGroup) {
        return 'All fields are required';
    }
    if (donation.unitsDonated <= 0) {
        return 'Quantity must be greater than zero';
    }
    return null;
}

export const getDonationHistory = async (email: string): Promise<DonationRecordDto[]> => {
    return Donation.find({ donorEmail: email });
};

export const getDonationRecordByEmail = async (email: string): Promise<DonationRecordDto | null> => {
   return Donation.findOne({ donorEmail: email });

}

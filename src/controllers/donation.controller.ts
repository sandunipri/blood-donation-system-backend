import {Response,Request} from "express";
import {DonationRecordDto} from "../dto/donation.dto";
import * as donationService from "../services/donation.service";
import * as userService from "../services/user.service";
import * as hospitalService from "../services/hospital.service";

export const donateBlood = async (req : Request , res : Response) => {
    const donationRecord: DonationRecordDto = req.body;
    try {
        //check email
        const donor = await userService.findUserEmail(donationRecord.donorEmail)
        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        }
        //check blood group
        if (donor.bloodGroup !== donationRecord.bloodGroup) {
            return res.status(400).json({ error: "Blood group does not match donor's record" });
        }

        //check hospital
        const hospital = await hospitalService.findHospitalByEmail(donationRecord.hospitalEmail)
        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found or invalid email" });
        }

        //check if donor is eligible
        const eligibilityMessage = isEligibleToDonate(donor.dateOfBirth); // use donor’s DOB from DB
        if (eligibilityMessage) {
            return res.status(400).json({ error: eligibilityMessage });
        }

        //update blood stock in hospital
        const existBloodStock = hospital.bloodStock.find(
            (stock) => stock.bloodType === donationRecord.bloodGroup
        )
        if (existBloodStock) {
            existBloodStock.quantity += donationRecord.unitsDonated;
        }else {
            hospital.bloodStock.push({
                bloodType: donationRecord.bloodGroup,
                quantity: donationRecord.unitsDonated
            });
        }
        await hospital.save();

        // Create the donation record
        const donation = await donationService.donateBlood(donationRecord);
        return res.status(201).json({ message: "Donation successful", donation });

    } catch (error) {
        console.error("Error during blood donation:", error);
        return res.status(500).json({ error: "An error occurred while processing the donation" });

    }
}

export const isEligibleToDonate = (dateOfBirth: string): string | null => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 65) {
        return "Donor is not eligible by age (must be 18–65)";
    }

    return null;
};

export const getDonationRecords = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const records = await  donationService.getDonationHistory(email);
        if (!records || records.length === 0){
            return res.status(404).json({ message: "No donation history found." });
        }
        res.status(200).json(records);

    }catch (error){
        console.error("Error fetching donation history:", error);
        res.status(500).json({ error: "Server error retrieving donation history" });
    }
}

export const getDonationRecordByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const records = await donationService.getDonationHistory(email);
        if (!records || records.length === 0) {
            return res.status(404).json({ message: "No donation history found for this email." });
        }
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching donation record by email:", error);
        res.status(500).json({ error: "Server error retrieving donation record" });
    }
}

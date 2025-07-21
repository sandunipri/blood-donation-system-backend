import {Response, Request} from "express";
import * as requestBloodService from "../services/bloodrequest.service";
import * as userService from "../services/user.service";
import * as hospitalService from "../services/hospital.service";

export const requestBlood = async (req: Request, res: Response) => {
    const bloodRequest = req.body;
    try {
        const requestUser = await userService.findUserEmail(bloodRequest.requesterEmail);
        if (!requestUser) {
            return res.status(404).json({error: "Requester not found"});
        }
        // Check if the requester has a valid blood group
        const bloodGroup = await userService.findUserBloodGroup(bloodRequest.requesterEmail)
        if (!bloodGroup) {
            return res.status(400).json({error: "Invalid blood group"});
        }
        //if the check blood is available in the hospital
        const hospital = await hospitalService.findHospitalByEmail(bloodRequest.hospitalEmail);

        if (!hospital) {
            return res.status(404).json({error: "Hospital not found"});
        }

        const bloodStock = hospital.bloodStock.find(
            (stock) => stock.bloodType === bloodRequest.bloodGroup
        )

        if (!bloodStock || bloodStock.quantity < bloodRequest.unitsNeeded) {
            return res.status(400).json({
                error: `Requested blood  is not available in sufficient quantity at this hospital.`,
            });
        } else {
            bloodStock.quantity -= bloodRequest.unitsNeeded;
            await hospital.save();
        }

        // Create the blood request
        const bloodRequestRecord = await requestBloodService.requestBlood(bloodRequest);
        return res.status(201).json({message: "Blood request successful", bloodRequestRecord});

    } catch (error) {
        console.error("Error during blood request:", error);
        return res.status(500).json({error: "An error occurred while processing the blood request"});
    }

}
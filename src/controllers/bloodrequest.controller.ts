import {Response, Request} from "express";
import * as requestBloodService from "../services/bloodrequest.service";
import * as userService from "../services/user.service";
import * as hospitalService from "../services/hospital.service";
import { Notification } from "../model/notification.model";


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
        }

        await Notification.create({
            message: `Blood request from ${bloodRequest.requesterEmail} for ${bloodRequest.unitsNeeded} units of ${bloodRequest.bloodGroup}`,
            type: "blood-request",
            role: "admin",
            userEmail: bloodRequest.requesterEmail,
            isRead: false
        })

        // Create the blood request
        const bloodRequestRecord = await requestBloodService.requestBlood(bloodRequest);
        return res.status(201).json({message: "Blood request successful", bloodRequestRecord});

    } catch (error) {
        console.error("Error during blood request:", error);
        return res.status(500).json({error: "An error occurred while processing the blood request"});
    }

}

export const confirmBloodRequest = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const bloodRequest = await requestBloodService.findLatestPendingRequestByEmail(email);
        if (!bloodRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        const hospital = await hospitalService.findHospitalByEmail(bloodRequest.hospitalEmail);
        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        const bloodStock = hospital.bloodStock.find(
            (stock) => stock.bloodType === bloodRequest.bloodGroup
        );

        if (!bloodStock || bloodStock.quantity < bloodRequest.unitsNeeded) {
            return res.status(400).json({ error: "Not enough stock" });
        }

        bloodStock.quantity -= bloodRequest.unitsNeeded;
        await hospital.save();

        bloodRequest.status = "confirmed";
        await bloodRequest.save();

        await Notification.create({
            message: `Your blood request for ${bloodRequest.unitsNeeded} units of ${bloodRequest.bloodGroup} has been approved.`,
            type: "confirmation",
            role: "user",
            userEmail: bloodRequest.requesterEmail,
            isRead: false
        });

        return res.status(200).json({ message: "Request confirmed and user notified." });

    } catch (error) {
        console.error("Error confirming blood request:", error);
        return res.status(500).json({ error: "An error occurred while confirming the request." });
    }
};

export const getAllRequests = async (req :Request, res: Response) => {
    try {
        const notificationRequests = await requestBloodService.getAllRequests();
        if (!notificationRequests || notificationRequests.length === 0) {
            return res.status(404).json({ message: "No blood requests found" });
        }
        res.status(200).json(notificationRequests);

    }catch (error){
        console.log("Error in Requests" , error)
        res.status(500).json({ error: "Something went wrong while adding the hospital" });
    }
}
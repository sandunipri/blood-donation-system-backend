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
            (stock) => stock.bloodGroup === bloodRequest.bloodGroup
        )

        if (!bloodStock || bloodStock.units < bloodRequest.unitsNeeded) {
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

export const getAllRequestCount = async (req: Request, res: Response) => {
    try {
        const requestCount = await requestBloodService.getAllRequestCount();
        if (requestCount === 0) {
            return res.status(404).json({ message: "No blood requests found" });
        }
        res.status(200).json({ count: requestCount });
    } catch (error) {
        console.error("Error fetching blood request count:", error);
        res.status(500).json({ error: "An error occurred while fetching the blood request count" });
    }

}
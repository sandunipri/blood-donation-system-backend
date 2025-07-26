import {Request, Response} from "express";
import * as notificationService from "../services/notification.service";
import {sendConfirmNotificationEmail} from "../utils/email";
import * as requestBloodService from "../services/bloodrequest.service";
import * as hospitalService from "../services/hospital.service";


export const getAllRequestNotification = async (req :Request, res: Response) => {
    try {
        const notificationRequests = await notificationService.getAllRequestsNotification();
        if (!notificationRequests || notificationRequests.length === 0) {
            return res.status(404).json({ message: "No blood requests found" });
        }
        res.status(200).json(notificationRequests);

    }catch (error){
        console.log("Error in Requests" , error)
        res.status(500).json({ error: "Something went wrong while adding the hospital" });
    }
}

export const confirmNotification = async (req: Request, res: Response) => {
    const {email} = req.params;

    try {
        const notification = await notificationService.findNotificationByEmail(email);

        if (!notification){
            return res.status(404).json({ error: "Notification not found" });
        }
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


        //email send
        await sendConfirmNotificationEmail(
            email,
            "Your blood request has been confirmed by the admin."
        );

        bloodStock.quantity -= bloodRequest.unitsNeeded;
        await hospital.save();


        res.status(200).json({ message: "Notification confirmed", notification });
    }catch (error){
        console.error("Error confirming notification:", error);
        res.status(500).json({ error: "An error occurred while confirming the notification." });
    }
}

export const rejectNotification = async (req: Request, res: Response) => {
    try {
        const {email} = req.params;
        const notification = await notificationService.findNotificationByEmail(email);
        if (!notification){
            return res.status(404).json({ error: "Notification not found" });
        }
        //email send
        await sendConfirmNotificationEmail(
            email,
            "Your blood request has been rejected by the admin."
        );
        res.status(200).json({ message: "Notification rejected", notification });
    }catch (error){
        console.error("Error rejecting notification:", error);
        res.status(500).json({ error: "An error occurred while rejecting the notification." });
    }
}
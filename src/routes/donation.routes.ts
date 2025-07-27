import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {donateBlood ,getDonationRecords} from "../controllers/donation.controller";

const donationRoutes : Router = Router();

donationRoutes.post("/donate",authorizeRoles('admin'),donateBlood)
donationRoutes.get("/getHistoryRecord/:email", authorizeRoles('donor', 'admin'), getDonationRecords );

export default donationRoutes;
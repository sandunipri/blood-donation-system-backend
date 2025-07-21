import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {donateBlood} from "../controllers/donation.controller";

const donationRoutes : Router = Router();

donationRoutes.post("/donate",authorizeRoles('admin'),donateBlood)

export default donationRoutes;
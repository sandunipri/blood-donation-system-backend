import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {addHospital} from "../controllers/hospital.controller";

const hospitalRoutes : Router = Router();

hospitalRoutes.post("/save",authorizeRoles('admin'),addHospital)

export default hospitalRoutes;
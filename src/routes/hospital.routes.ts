import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {addHospital, getAllHospital} from "../controllers/hospital.controller";

const hospitalRoutes : Router = Router();

hospitalRoutes.post("/save",authorizeRoles('admin'),addHospital)
hospitalRoutes.get("/getAll",authorizeRoles('admin','donor'),getAllHospital)

export default hospitalRoutes;
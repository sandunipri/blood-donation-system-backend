import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {addHospital, getAllHospital, getBloodStockController, getAllHospitalCount} from "../controllers/hospital.controller";

const hospitalRoutes : Router = Router();

hospitalRoutes.post("/save",authorizeRoles('admin'),addHospital)
hospitalRoutes.get("/getAll",authorizeRoles('admin','donor','recipient'),getAllHospital)
hospitalRoutes.get("/blood-stocks",authorizeRoles('admin'), getBloodStockController);
hospitalRoutes.get("/getAllHospitalCount",authorizeRoles('admin'), getAllHospitalCount);



export default hospitalRoutes;
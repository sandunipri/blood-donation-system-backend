import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {addHospital, getAllHospital, getBloodStockController} from "../controllers/hospital.controller";

const hospitalRoutes : Router = Router();

hospitalRoutes.post("/save",authorizeRoles('admin'),addHospital)
hospitalRoutes.get("/getAll",authorizeRoles('admin','donor'),getAllHospital)
hospitalRoutes.get("/blood-stocks",authorizeRoles('admin'), getBloodStockController);


export default hospitalRoutes;
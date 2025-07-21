import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {requestBlood} from "../controllers/bloodrequest.controller";


const bloodRequestRoutes : Router = Router()

bloodRequestRoutes.post("/request",authorizeRoles('recipient','donor'),requestBlood)

export default bloodRequestRoutes;

import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {getAllRequests, requestBlood} from "../controllers/bloodrequest.controller";
const bloodRequestRoutes : Router = Router()


bloodRequestRoutes.post("/request",authorizeRoles('recipient','donor','admin'),requestBlood)
bloodRequestRoutes.get("/getAllRequest",authorizeRoles('admin'),getAllRequests)


export default bloodRequestRoutes;

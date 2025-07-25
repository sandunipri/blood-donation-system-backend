import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {confirmBloodRequest, getAllRequests, requestBlood} from "../controllers/bloodrequest.controller";
const bloodRequestRoutes : Router = Router()


bloodRequestRoutes.post("/request",authorizeRoles('recipient','donor','admin'),requestBlood)
bloodRequestRoutes.get("/getAllRequest",authorizeRoles('admin'),getAllRequests)
bloodRequestRoutes.put("/confirm/:email", authorizeRoles('admin'), confirmBloodRequest);


export default bloodRequestRoutes;

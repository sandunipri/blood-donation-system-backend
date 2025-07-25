import {Router} from "express";
import {authorizeRoles} from "../middleware/auth.middleware";
import {
    confirmNotification,
    getAllRequestNotification,
    rejectNotification
} from "../controllers/notification.controller";

const notificationRoutes : Router = Router();

notificationRoutes.get("/requests",authorizeRoles('admin'),getAllRequestNotification)
notificationRoutes.patch("/confirm/:email",authorizeRoles('admin'),confirmNotification)
notificationRoutes.patch("/reject/:email",authorizeRoles('admin'),rejectNotification)

export default notificationRoutes


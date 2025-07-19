import {Router} from "express";
import {authenticateUser, registerUser} from "../controllers/auth.controller";

const authRouter:Router = Router();

authRouter.post("/register", registerUser) // Assuming you want to use the same controller for registration
authRouter.post("/login", authenticateUser)

export default authRouter;
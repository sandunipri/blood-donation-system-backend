import {Router} from "express";
import {authenticateAdmin, authenticateUser, registerAdmin, registerUser} from "../controllers/auth.controller";

const authRouter:Router = Router();

authRouter.post("/register", registerUser)
authRouter.post("/registerAdmin", registerAdmin)
authRouter.post("/login", authenticateUser)
authRouter.post("/loginAdmin", authenticateAdmin)

export default authRouter;
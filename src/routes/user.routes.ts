import {Router} from "express";
import {registerUser} from "../controllers/user.controller";

const userRouter : Router = Router();

// userRouter.post("/register",registerUser);
// userRouter.get("/login",loginUser)

export default userRouter;

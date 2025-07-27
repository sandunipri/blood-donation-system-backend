import {Router} from "express";
import {updateUser,deleteUser,getAllDonors} from "../controllers/user.controller";
import {authorizeRoles} from "../middleware/auth.middleware";


const userRouter : Router = Router();

userRouter.post("/update/:email",authorizeRoles('donor', 'admin'),updateUser);
userRouter.delete("/delete/:email",authorizeRoles('donor', 'admin'),deleteUser);
userRouter.get("/getAllDonors",authorizeRoles('admin'), getAllDonors);


export default userRouter;

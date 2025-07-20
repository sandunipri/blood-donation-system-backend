import {Response,Request} from "express";
import * as userService from "../services/user.service";
import bcrypt from "bcryptjs";


/*export const registerUser = async (req :Request , res: Response) => {
       try{
            const newUser = req.body;
            const validationError = userService.validateUser(newUser);
            if (validationError) {
                res.status(400).json({error: validationError});
                return;
            }

           const hashedPassword = await bcrypt.hash(newUser.password, 10);
           newUser.password = hashedPassword;

            const savedUser = await userService.registerUser(newUser);
            res.status(201).json(savedUser);
        }catch (error){
            console.log(error);
            res.status(500).json({error: "Something went wrong"});
        }

}*/

/*export const loginUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await userService.loginUser(email, password);
        if(!user){
            res.status(401).json({error: "Invalid email or password"});
        }
        console.log(user)
        res.status(200).json(user);
    }catch (error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }
}*/

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email;
        if (!userEmail) {
            return res.status(400).json({ error: "Email is required" });
        }

        const updateData = req.body;

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            updateData.password = hashedPassword;
        }

        const updateUser = await userService.updateUser(userEmail, updateData);
        if (!updateUser){
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ message: "User updated successfully", user: updateUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }

}

export const deleteUser = async (req : Request, res: Response) => {
    try {
        const userEmail = req.params.email;
        if (!userEmail) {
            return res.status(400).json({ error: "Email is required" });
        }
        const deleteUser = await userService.deleteUser(userEmail);
        if (!deleteUser){
            return res.status(404).json({ error : "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

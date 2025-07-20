import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validateUser } from '../services/user.service';
import bcrypt from "bcryptjs";
import {validateAdmin} from "../services/admin.service";


export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const authTokens = await authService.authenticateUser(email, password);

        console.log("Access Token:", authTokens.accessToken);
        console.log("Refresh Token:", authTokens.refreshToken);

        res.json(authTokens);

    } catch (error: any) {
        console.error("Authentication failed:", error.message);
        res.status(401).json({ error: error.message || 'Invalid credentials' });
    }
};

export const authenticateAdmin = async (req: Request , res:Response)=>{
    try {
        const { email, password } = req.body;

        const authTokens = await authService.authenticateAdmin(email, password);

        console.log("Access Token:", authTokens.accessToken);
        console.log("Refresh Token:", authTokens.refreshToken);

        res.json(authTokens);

    } catch (error: any) {
        console.error("Authentication failed:", error.message);
        res.status(401).json({ error: error.message || 'Invalid credentials' });
    }
}

export const registerUser = async (req :Request , res: Response) => {
    try{
        const newUser = req.body;
        const validationError =validateUser(newUser);
        if (!validationError) {
            res.status(400).json({error: validationError});
            return;
        }

  /*      const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;*/
        newUser.password = await bcrypt.hash(newUser.password, 10);

        const savedUser = await authService.registerUser(newUser);
        res.status(201).json(savedUser);
    }catch (error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }

}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const newAdmin = req.body;
        const validationError = validateAdmin(newAdmin);
        if (!validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        newAdmin.password = await bcrypt.hash(newAdmin.password, 10);

        const newAdminSaved = await authService.registerAdmin(newAdmin);
        res.status(201).json(newAdminSaved);

    }catch (error){
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}


import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import bcrypt from "bcryptjs";


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

export const registerUser = async (req :Request , res: Response) => {
    try{
        const newUser = req.body;
        const validationError = authService.validateUser(newUser);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        const savedUser = await authService.registerUser(newUser);
        res.status(201).json(savedUser);
    }catch (error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }

}
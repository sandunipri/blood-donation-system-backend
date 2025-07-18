import {Response,Request} from "express";
import * as userService from "../services/user.service";

export const registerUser = async (req :Request , res: Response) => {
    try{
        const newUser = req.body;
        const validationError = userService.validateUser(newUser);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const savedUser = await userService.registerUser(newUser);
        res.status(201).json(savedUser);
    }catch (error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }

}
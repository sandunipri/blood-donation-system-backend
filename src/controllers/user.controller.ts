import {Response, Request} from "express";
import * as userService from "../services/user.service";
import bcrypt from "bcryptjs";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email;
        if (!userEmail) {
            return res.status(400).json({error: "Email is required"});
        }

        const updateData = req.body;

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            updateData.password = hashedPassword;
        }

        const updateUser = await userService.updateUser(userEmail, updateData);
        if (!updateUser) {
            res.status(404).json({error: "User not found"});
            return;
        }
        res.status(200).json({message: "User updated successfully", user: updateUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email;
        if (!userEmail) {
            return res.status(400).json({error: "Email is required"});
        }
        const deleteUser = await userService.deleteUser(userEmail);
        if (!deleteUser) {
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }
}

export const getAllDonors = async (req: Request, res: Response) => {
    try {
        const donors = await userService.getAllDonors("donor");
        if (!donors || donors.length === 0) {
            return res.status(404).json({message: "No donors found"});
        }
        res.status(200).json(donors);

    } catch (error) {
        console.log("Error in fetching donors:", error);
        res.status(500).json({error: "Something went wrong while fetching donors"});
    }

}

export const getAllRecipient = async (req: Request, res: Response) => {
    try {
        const recipient = await userService.getAllRecipient("recipient");
        if (!recipient || recipient.length === 0) {
            return res.status(404).json({message: "No recipients found"});
        }
        res.status(200).json(recipient);
    }catch (error){
        console.log("Error in fetching recipients:", error);
        res.status(500).json({error: "Something went wrong while fetching recipients"});
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json(users);
    }catch (error){
        console.log("Error in fetching users:", error);
        res.status(500).json({error: "Something went wrong while fetching users"});
    }
}

export const getAllUserCount = async (req: Request, res: Response) => {
    try {
        const userCount = await userService.getAllUserCount();
        if (userCount === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json({count: userCount});
    } catch (error) {
        console.log("Error in fetching user count:", error);
        res.status(500).json({error: "Something went wrong while fetching user count"});
    }
}
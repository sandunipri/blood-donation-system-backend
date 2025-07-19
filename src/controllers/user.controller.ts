import {Response,Request} from "express";
import * as userService from "../services/user.service";

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

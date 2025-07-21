import {Response,Request} from "express";
import {validateHospital} from "../services/hospital.service";
import * as hospitalService from "../services/hospital.service";


export const addHospital = async (req: Request , res: Response) => {
    try {
        const newHospital = req.body;
        const validationError = validateHospital(newHospital);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }
        const savedHospital = await hospitalService.addHospital(newHospital);
        res.status(201).json(savedHospital);
    } catch (error) {
        console.error("Error adding hospital:", error);
        res.status(500).json({ error: "Something went wrong while adding the hospital" });
    }

}
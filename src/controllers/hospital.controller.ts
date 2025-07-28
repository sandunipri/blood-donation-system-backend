import {Response,Request} from "express";
import {getAllBloodStocks, validateHospital} from "../services/hospital.service";
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

export const getAllHospital = async (req: Request, res: Response) => {
    try {
        const hospitals = await hospitalService.getAllHospitals();
        res.status(200).json(hospitals);
    }catch (error){
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ error: "Something went wrong while fetching hospitals" });
    }
}


export const getBloodStockController = async (req: Request, res: Response) => {
    try {
        const stock = await getAllBloodStocks();
        res.status(200).json(stock);
    } catch (error) {
        console.error("Error fetching blood stocks:", error);
        res.status(500).json({ message: "Failed to retrieve blood stock" });
    }
};

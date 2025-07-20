import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";
import Admin from "../model/admin.model"
import {UserDto} from "../dto/user.dto";
import {AdminDto} from "../dto/admin.dto";


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();

export const authenticateUser = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) throw new Error("Invalid email");

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) throw new Error("Invalid password");

    const accessToken = jwt.sign({
        email: existingUser.email,
        role: existingUser.role
    }, JWT_SECRET, { expiresIn: "5m" });

    const refreshToken = jwt.sign({
        email: existingUser.email,
    }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    refreshTokens.add(refreshToken);

    return {
        accessToken,
        refreshToken
    };

}

export const authenticateAdmin = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const existingAdmin = await Admin.findOne({email}).select("+password");
    if (!existingAdmin) throw new Error("Invalid email");

    const isValidPassword = await bcrypt.compare(password, existingAdmin.password);
    if (!isValidPassword) throw new Error("Invalid Password")

    const accessToken = jwt.sign({
        email: existingAdmin.email,
        role: existingAdmin.role
    }, JWT_SECRET, { expiresIn: "5m" });

    const refreshToken = jwt.sign({
        email: existingAdmin.email,
    }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    refreshTokens.add(refreshToken);

    return {
        accessToken,
        refreshToken
    }

}





export const registerUser =async (user: UserDto): Promise<UserDto>  => {
    return User.create(user);
}

export const registerAdmin = async (admin : AdminDto) : Promise<AdminDto> => {
    return Admin.create(admin);
}



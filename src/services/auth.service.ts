import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";
import {UserDto} from "../dto/user.dto";


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

export const registerUser =async (user: UserDto): Promise<UserDto>  => {
    return User.create(user);
}

export const validateUser = (user : UserDto) => {
    if (!user.firstname || !user.lastname || !user.email || !user.password || !user.role || !user.address || !user.nic || !user.gender || !user.bloodGroup
        || !user.bloodGroup || !user.phone || !user.dateOfBirth) {
        return 'All fields are required';
    }
    return null;
}
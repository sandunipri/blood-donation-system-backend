import {UserDto} from '../dto/user.dto';
import User from "../model/user.model";

/*/!*export const registerUser =async (user: UserDto): Promise<UserDto>  => {
    return User.create(user);
}*!/

export const loginUser = async (email: string, password: string): Promise<UserDto | null> => {
    return User.findOne({ email, password })
}


/!*export const validateUser = (user : UserDto) => {
    if (!user.firstname || !user.lastname || !user.email || !user.password || !user.role || !user.address || !user.nic || !user.gender || !user.bloodGroup
    || !user.bloodGroup || !user.phone || !user.dateOfBirth) {
        return 'All fields are required';
    }
    return null;
}*!/*/

export const updateUser = async (email : string, data :UserDto)  => {
    const user = await User.findOneAndUpdate({email: email}, data, {new: true})
    if (!user){
        return null;
    }
    Object.assign(user , data)
    return user;
}

export const deleteUser = async (email : string) => {
    const user = await User.findOneAndDelete({email: email});
    if (!user) {
        return null;
    }
    return user;
}


export const validateUser = (user : UserDto) => {
    if (!user.firstname || !user.lastname || !user.email || !user.password || !user.role || !user.address || !user.nic || !user.gender || !user.bloodGroup
        || !user.bloodGroup || !user.phone || !user.dateOfBirth) {
        return 'All fields are required';
    }
    return null;
}
import {UserDto} from '../dto/user.dto';
import User from "../model/user.model";
import {DonationRecordDto} from "../dto/donation.dto";

export const findUserEmail = async (email: string) => {
    return User.findOne({ email: email});
}

export const findUserBloodGroup = async (bloodGroup : string) => {
    return User.find({ bloodGroup: bloodGroup });
}

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

export const getAllDonors = async (role : string): Promise<UserDto[]> => {
    return User.find({ role: role });
}

export const getAllRecipient = async (role : string): Promise<UserDto[]> => {
    return User.find({role: role});
}

export const getAllUsers = async (): Promise<UserDto[]> => {
    return User.find();
}

export const getAllUserCount = async (): Promise<number> => {
    return User.countDocuments();
}

export const finnOneUser = async (email: string): Promise<UserDto | null> => {
    return User.findOne({ email: email });
};

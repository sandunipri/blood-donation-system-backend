import {UserDto} from '../dto/user.dto';
import User from "../model/user.model";

/*export const registerUser =async (user: UserDto): Promise<UserDto>  => {
    return User.create(user);
}*/

// export const loginUser = async (email: string, password: string): Promise<UserDto | null> => {
//     return User.findOne({ email, password })
// }


/*export const validateUser = (user : UserDto) => {
    if (!user.firstname || !user.lastname || !user.email || !user.password || !user.role || !user.address || !user.nic || !user.gender || !user.bloodGroup
    || !user.bloodGroup || !user.phone || !user.dateOfBirth) {
        return 'All fields are required';
    }
    return null;
}*/

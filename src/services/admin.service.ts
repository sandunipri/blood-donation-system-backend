import {AdminDto} from "../dto/admin.dto";

export const validateAdmin = (admin : AdminDto) => {
    if (!admin.name || !admin.password || !admin.email || !admin.nic || !admin.phone || !admin.role ){
        return 'All fields are required';
    }
    return true
}
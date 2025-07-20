export interface UserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    nic: string;
    phone: string;
    bloodGroup?: string;
    role: 'donor' | 'recipient';
    gender: 'Male' | 'Female';
    dateOfBirth: string;
    address: string;
}
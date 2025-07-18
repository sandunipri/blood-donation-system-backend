export interface UserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    nic: string;
    phone: string;
    bloodGroup?: string;
    role: 'donor' | 'recipient' | 'hospital';
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    address: string;
}
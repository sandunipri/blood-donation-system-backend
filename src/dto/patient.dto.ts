export interface PatientDto {
    name: string;
    nic: string;
    bloodGroup: string;
    contactNumber: string;
    hospitalId: string;
    status: 'active' | 'inactive' | 'completed';
}

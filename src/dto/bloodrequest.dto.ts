export interface BloodRequestDto {
    requesterName: string;
    requesterEmail: string;
    bloodGroup: string;
    unitsNeeded: number;
    hospitalEmail: string;
    reason: string;
    neededDate: string;
    status?: "pending" | "confirmed" | "rejected";
}

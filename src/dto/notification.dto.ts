export interface NotificationDto{
    message: string,
    type: string,
    role: string,
    userEmail: string,
    isRead?: boolean
}
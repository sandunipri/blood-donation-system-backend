import Notification from "../model/notification.model";
import { NotificationDto } from "../dto/notification.dto";

export const createNotification = async (notification: NotificationDto) => {
    return await Notification.create({
        ...notification,
        isRead: false
    });
};

export const getAllRequestsNotification = async ():Promise<NotificationDto[]> =>{
    return Notification.find()
}

export const findNotificationByEmail = async (email: string): Promise<NotificationDto | null> => {
    return Notification.findOne({ userEmail: email });
}
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        message: String,
        type: String,
        role: String,
        userEmail: String,
        isRead: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ["pending", "confirmed", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendRegisterEmail = async (toEmail: string, name: string) => {
    try {
        await transporter.sendMail({
            from: `"Blood Donation System" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Welcome to Blood Donation System",
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #e74c3c; text-align: center;">🩸 Welcome to the Blood Donation Community!</h2>
      <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        Thank you for registering with us. Your support can help save lives. We're thrilled to have you as part of our donor network.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://your-app-link.com/login" style="background-color: #e74c3c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Go to Your Dashboard
        </a>
      </div>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 13px; color: #777; text-align: center;">
        This message was sent to you by Blood Donation System. If you didn't register, please ignore this email.
      </p>
    </div>
  </div>
`
        });
    } catch (err) {
        console.error("Email send failed:", err);
    }
};

export const sendConfirmNotificationEmail = async (toEmail: string, message: string) => {
    try {
        await transporter.sendMail({
            from: `"Blood Donation System" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Notification from Blood Donation System",
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #e74c3c;">🔔 Notification</h2>
      <p style="font-size: 16px; color: #333;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 13px; color: #777; text-align: center;">
        This message was sent to you by Blood Donation System.
      </p>
    </div>
  </div>
`
        });
    } catch (err) {
        console.error("Notification email send failed:", err);
    }
}

export const sendRejectNotificationEmail = async (toEmail: string, message: string) => {
    try {
        await transporter.sendMail({
            from: `"Blood Donation System" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Notification from Blood Donation System",
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #e74c3c;">🔔 Notification</h2>
      <p style="font-size: 16px; color: #333;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 13px; color: #777; text-align: center;">
        This message was sent to you by Blood Donation System.
      </p>
    </div>
  </div>
`
        });
    } catch (err) {
        console.error("Reject notification email send failed:", err);
    }
}
import express, { Express } from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import hospitalRoutes from "./routes/hospital.routes"
import {authenticateToken} from "./middleware/auth.middleware";
import donationRoutes from "./routes/donation.routes";
import bloodRequestRoutes from "./routes/bloodrequest.routes";
import notificationRoutes from "./routes/notification.routes";

const app: Express = express();

const allowedOrigins = ["http://localhost:5173","http://localhost:5174"];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/user",authenticateToken, userRouter);
app.use("/api/hospital",authenticateToken,hospitalRoutes)
app.use("/api/donation",authenticateToken,donationRoutes)
app.use("/api/request-blood", authenticateToken, bloodRequestRoutes);
app.use("/api/notification",authenticateToken, notificationRoutes);

export default app;

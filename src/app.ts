import express, { Express } from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import hospitalRoutes from "./routes/hospital.routes"
import {authenticateToken} from "./middleware/auth.middleware";

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

export default app;

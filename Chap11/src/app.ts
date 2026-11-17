import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import { prisma } from "./db.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./routes.js";
import rateLimit from "express-rate-limit";


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
})
const apiLimiter = authLimiter;

const app = express();
app.use(helmet());

app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/refresh", authLimiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(authRouter);
app.use(userRouter);
app.use(postRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);

});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

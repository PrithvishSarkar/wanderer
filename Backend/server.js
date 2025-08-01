/* Module Imports Starts Here */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: ["./.env", "./.env.development", "./.env.production"] });
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import connectDb from "./dbConnect.js";
/* Module Imports Ends Here */

// Database Connection
connectDb();

const PORT = process.env.PORT || 4000;
const app = express();

/* Application Level Middleware Group Starts Here */
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.FRONTEND_HOSTNAME);
app.use(
  cors({
    origin: process.env.FRONTEND_HOSTNAME, // allows only my frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // restricts allowed methods
    credentials: true, // allows cookies and authorization headers
    allowedHeaders: ["Content-Type", "Authorization"], // restricts allowed headers
  })
);
app.use(helmet());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", blogRoutes);
/* Application Level Middleware Group Ends Here */

// Testing Backend Working Status
app.get("/", (_, res) => {
  res.status(200).json({ status: "success", message: "Backend Working" });
});

app.listen(PORT, () => {
  console.info(`Listening to URL ${process.env.BACKEND_URL}:${PORT}`);
});

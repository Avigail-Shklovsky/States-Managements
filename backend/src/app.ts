import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import stateRoutes from "./routes/stateRoutes";
import userRoutes from "./routes/userRoutes";
import citiesRoutes from "./routes/citiesRoutes";
import messageRoutes from "./routes/messageRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// xss protection
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "http://localhost:5000"],
    },
  })
);

app.use("/states", stateRoutes);
app.use("/user", userRoutes);
app.use("/cities", citiesRoutes);
app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
export default app;

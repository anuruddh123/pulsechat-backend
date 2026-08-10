import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

connectDB();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' })); // increase to 10 MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

// ✅ CORS middleware comes before routes!
app.use(
  cors({
    origin: "https://chatappsssss.netlify.app",
    credentials: true,
  })
);

// ✅ Your API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// ✅ Start server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT: " + PORT);
});

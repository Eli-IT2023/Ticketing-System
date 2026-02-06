import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import { createServer } from "http";

// Routers
import projectRoute from "./routes/project.route.js";
import ticketRoute from "./routes/tickets.route.js";
// Seeders
import { seedProjects } from "./seeds/project.seeds.js";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 4001;

// CORS
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/projects", projectRoute);
app.use("/tickets", ticketRoute);
// Database + Server
sequelize
  .authenticate()
  .then(() => sequelize.sync({ alter: false }))
  .then(() => {
    console.log("✅ Database synced successfully");
    seedProjects();

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Database connection failed:", err));

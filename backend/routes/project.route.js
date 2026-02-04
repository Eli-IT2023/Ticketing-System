import express from "express";
import { getAllProjects } from "../controllers/projectController.js";

const router = express.Router();

router.post("/getAllProjects", getAllProjects);

export default router;

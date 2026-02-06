import express from "express";
import { getAllProjects } from "../controllers/project/projectController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);

export default router;

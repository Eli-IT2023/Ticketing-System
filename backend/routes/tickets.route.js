import express from "express";
import upload from "../middlewares/upload.js";
import {
  createTicket,
  getAllTicketNoPicVidByID,
  getTicketDetailsByIDWithVidPIC,
} from "../controllers/ticket/ticketsController.js";

const router = express.Router();

router.post(
  "/createTicket",
  upload.fields([
    { name: "image_attachment", maxCount: 1 },
    { name: "video_attachment", maxCount: 1 },
  ]),
  createTicket
);

router.get("/getAllTicketNoPicVidByID", getAllTicketNoPicVidByID);

router.get("/getTicketDetailsByIDWithVidPIC", getTicketDetailsByIDWithVidPIC);
export default router;

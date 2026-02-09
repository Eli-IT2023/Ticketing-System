import express from "express";
import upload from "../middlewares/upload.js";
import {
  createTicket,
  getAllTicketNoPicVidByID,
  getTicketDetailsByIDWithVidPIC,
  getAllTicketNoPicVidByProj_SEARCH,
  getAllTicketNoPicVidByProj_FILTER,
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
router.get(
  "/getAllTicketNoPicVidByProj_SEARCH",
  getAllTicketNoPicVidByProj_SEARCH
);
router.get(
  "/getAllTicketNoPicVidByProj_FILTER",
  getAllTicketNoPicVidByProj_FILTER
);

export default router;

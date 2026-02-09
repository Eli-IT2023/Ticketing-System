import { Tickets } from "../../models/associations.js";
import sequelize from "../../config/database.js";
import { generateTicketReference } from "./utils/generateTicketRef.js";
import { Op } from "sequelize";
import { sendTicketCreatedEmail } from "../../utils/mailer.js";
export const createTicket = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { project_id, contact_person, contact_email, description } = req.body;

    const image = req.files?.image_attachment?.[0]?.buffer || null;
    const video = req.files?.video_attachment?.[0]?.buffer || null;

    // 🔑 Generate reference number
    const reference_no = await generateTicketReference(project_id, t);

    const ticket = await Tickets.create(
      {
        reference_no,
        project_id,
        contact_person,
        contact_email,
        description,
        image_attachment: image,
        video_attachment: video,
      },
      { transaction: t }
    );

    // ✅ Register email AFTER COMMIT
    t.afterCommit(async () => {
      try {
        await sendTicketCreatedEmail({
          ticketId: ticket.id, // 🔑 REQUIRED for link
          reference_no,
          project_id,
          contact_person,
          contact_email,
          description,
        });
      } catch (emailErr) {
        console.error("Email failed AFTER commit:", emailErr);
        // Optional: log to DB / retry queue
      }
    });

    await t.commit();

    res.status(200).json({
      message: "Ticket created successfully",
      reference_no,
      ticket,
    });
  } catch (err) {
    await t.rollback();
    console.error(err);

    res.status(500).json({
      error: "Failed to create ticket",
      details: err.message,
    });
  }
};

// Get all tickets by ID

export const getAllTicketNoPicVidByID = async (req, res) => {
  try {
    const { selectedProjectId } = req.query;

    // console.log("selectedProjectId:", selectedProjectId);

    if (!selectedProjectId) {
      return res.status(400).json({
        error: "selectedProjectId is required",
      });
    }

    const tickets = await Tickets.findAll({
      where: { project_id: selectedProjectId, status: "NEW" },
      attributes: { exclude: ["image_attachment", "video_attachment"] },
    });

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tickets" });
  }
};

export const getTicketDetailsByIDWithVidPIC = async (req, res) => {
  try {
    const { ticketId } = req.query;

    const ticket = await Tickets.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({
      ...ticket.toJSON(),
      image_base64: ticket.image_attachment
        ? ticket.image_attachment.toString("base64")
        : null,
      video_base64: ticket.video_attachment
        ? ticket.video_attachment.toString("base64")
        : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve ticket" });
  }
};

export const getAllTicketNoPicVidByProj_SEARCH = async (req, res) => {
  try {
    const { selectedProjectId, searchTerm } = req.query;

    const where = { project_id: selectedProjectId };

    if (searchTerm) {
      where[Op.or] = [
        { reference_no: { [Op.like]: `%${searchTerm}%` } },
        { contact_person: { [Op.like]: `%${searchTerm}%` } },
        { contact_email: { [Op.like]: `%${searchTerm}%` } },
      ];
    }

    const tickets = await Tickets.findAll({
      where,
      attributes: { exclude: ["image_attachment", "video_attachment"] },
    });

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tickets" });
  }
};

export const getAllTicketNoPicVidByProj_FILTER = async (req, res) => {
  try {
    const { selectedProjectId, filteredStatus } = req.query;
    const where = { project_id: selectedProjectId };

    if (filteredStatus && filteredStatus !== "ALL") {
      where.status = filteredStatus;
    }

    const tickets = await Tickets.findAll({
      where,
      attributes: { exclude: ["image_attachment", "video_attachment"] },
    });

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tickets" });
  }
};

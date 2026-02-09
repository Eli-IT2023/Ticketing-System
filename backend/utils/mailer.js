import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export const sendTicketCreatedEmail = async ({
  ticketId,
  reference_no,
  project_id,
  contact_person,
  contact_email,
  description,
}) => {
  const ticketLink = `${process.env.VITE_FRONTEND_URL}/viewTicket/${ticketId}`;

  const mailOptions = {
    from: `"ELI Ticketing System" <${process.env.GMAIL_USER}>`,
    to: [
      "ELI-IT@elogicinnovations.com",
      "businessanalyst@elogicinnovations.com",
    ],
    subject: `🎫 New Ticket Created - ${reference_no}`,
    html: `
      <h2>New Ticket Created</h2>

      <p><strong>Reference No:</strong> ${reference_no}</p>
      <p><strong>Contact Person:</strong> ${contact_person}</p>
      <p><strong>Contact Email:</strong> ${contact_email}</p>

      <p><strong>Description:</strong></p>
      <div style="padding:10px;border:1px solid #ddd;border-radius:6px;">
        ${description}
      </div>

      <br />

      <a
        href="${ticketLink}"
        target="_blank"
        style="
          display:inline-block;
          padding:12px 18px;
          background:#4f46e5;
          color:#ffffff;
          text-decoration:none;
          border-radius:6px;
          font-weight:600;
        "
      >
        🔍 View Ticket Details
      </a>

      <br /><br />

      <p style="font-size:12px;color:#666;">
        This is an automated notification from the ELI Ticketing System.
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

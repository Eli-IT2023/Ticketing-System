import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, Spinner } from "react-bootstrap";
import api from "../../utils/axios";
import "./css/ticketDetails.css";

export default function TicketViewDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get("/tickets/getTicketDetailsByIDWithVidPIC", {
          params: { ticketId },
        });

        const t = res.data;

        setTicket({
          ...t,
          image_url: t.image_base64
            ? `data:image/jpeg;base64,${t.image_base64}`
            : null,
          video_url: t.video_base64
            ? `data:video/mp4;base64,${t.video_base64}`
            : null,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!ticket) {
    return <p className="text-center">Ticket not found.</p>;
  }

  return (
    <div className="ticket-details-container">
      <Button variant="link" onClick={() => navigate(-1)} className="mb-3">
        ← Back to Tickets
      </Button>

      <h3 className="mb-2">{ticket.reference_no}</h3>

      <Badge bg="secondary" className="mb-3">
        {ticket.status.replaceAll("_", " ")}
      </Badge>

      <div className="detail-section">
        <h5>Contact Person</h5>
        <div className="detail-box">{ticket.contact_person}</div>
        <h5>Contact Email</h5>
        <div className="detail-box"> {ticket.contact_email} </div>
        <h5>Description</h5>
        <div className="detail-box">
          {ticket.description || "No description provided."}
        </div>
      </div>

      {ticket.image_url && (
        <div className="detail-section">
          <h5>Image Attachment</h5>
          <img
            src={ticket.image_url}
            alt="Attachment"
            className="img-fluid rounded"
          />
        </div>
      )}

      {ticket.video_url && (
        <div className="detail-section">
          <h5>Video Attachment</h5>
          <video src={ticket.video_url} controls className="w-100 rounded" />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import "./css/ticketsSummary.css";
import useGetAllTicketNoPicVidByID from "../../hooks/getAllTicketNoPicVidByID";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TicketsSummary({ selectedProjectId }) {
  const { data: data } = useGetAllTicketNoPicVidByID(selectedProjectId);
  const STATUS_OPTIONS = [
    "ALL",
    "NEW",
    "ON_REVIEW",
    "SUPPORT_WILL_CONTACT",
    "IN_PROGRESS",
    "CLOSED",
  ];

  //   const MOCK_TICKETS = [
  //     {
  //       id: 1,
  //       reference_no: "SBF-2025-02-00001",
  //       project_name: "SBF Inventory",
  //       status: "NEW",
  //       created_at: "2025-02-06",
  //     },
  //     {
  //       id: 2,
  //       reference_no: "ACC-2025-02-00002",
  //       project_name: "Accounting System",
  //       status: "IN_PROGRESS",
  //       created_at: "2025-02-05",
  //     },
  //     {
  //       id: 3,
  //       reference_no: "HR-2025-02-00003",
  //       project_name: "HR Portal",
  //       status: "CLOSED",
  //       created_at: "2025-02-01",
  //     },
  //   ];

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  return (
    <div className="ticket-summary">
      {/* Header */}
      <div className="summary-header">
        <h3>Tickets</h3>

        <div className="filters">
          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search reference or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Reference No</th>
              <th>Contact Person</th>
              <th>Contact Email</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No tickets found
                </td>
              </tr>
            ) : (
              data.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="mono">{ticket.reference_no}</td>
                  <td>{ticket.contact_person}</td>
                  <td>{ticket.contact_email}</td>
                  <td>
                    <span className={`status-badge ${ticket.status}`}>
                      {ticket.status.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td>{ticket.createdAt}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => navigate(`/viewTicket/${ticket.id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

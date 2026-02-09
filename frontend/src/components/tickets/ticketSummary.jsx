import { useEffect, useState } from "react";
import "./css/ticketsSummary.css";
import useGetAllTicketNoPicVidByID from "../../hooks/getAllTicketNoPicVidByID";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatShortDate } from "../../helpers/formatShortDate";
import api from "../../utils/axios";
export default function TicketsSummary({ selectedProjectId }) {
  const { data: data } = useGetAllTicketNoPicVidByID(selectedProjectId);

  const STATUS_OPTIONS = [
    "ALL",
    "NEW",
    "ON REVIEW",
    "SUPPORT WILL CONTACT YOU",
    "IN-PROGRESS",
    "CLOSED",
  ];

  const [statusFilter, setStatusFilter] = useState("NEW");
  const [searchTerm, setSearchTerm] = useState("");

  const [uiData, setUIData] = useState([]);

  useEffect(() => {
    setUIData(data);
  }, [data]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setStatusFilter("ALL");
    const delay = setTimeout(() => {
      api
        .get("/tickets/getAllTicketNoPicVidByProj_SEARCH", {
          params: {
            selectedProjectId,
            searchTerm: value,
          },
        })
        .then((res) => {
          setUIData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

    return () => clearTimeout(delay);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    setSearchTerm("");
    const delay = setTimeout(() => {
      api
        .get("/tickets/getAllTicketNoPicVidByProj_FILTER", {
          params: {
            selectedProjectId,
            filteredStatus: value,
          },
        })
        .then((res) => {
          setUIData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

    return () => clearTimeout(delay);
  };

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
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleFilter(e.target.value)}
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
            {uiData.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No tickets found
                </td>
              </tr>
            ) : (
              uiData.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="mono">{ticket.reference_no}</td>
                  <td>{ticket.contact_person}</td>
                  <td>{ticket.contact_email}</td>
                  <td>
                    <span className={`status-badge ${ticket.status}`}>
                      {ticket.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{formatShortDate(ticket.createdAt)}</td>
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

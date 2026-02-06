import { useEffect, useState } from "react";
import TicketForm from "../components/tickets/ticketForm";
import TicketsSummary from "../components/tickets/ticketSummary";
import useGetProject from "../hooks/getAllProjects";
import swal from "sweetalert";
import "./css/ticketContainer.css";

export default function TicketContainer() {
  const { data } = useGetProject();
  const [activeTab, setActiveTab] = useState("create");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectFromURL = params.get("project");

    if (!projectFromURL || !data.length) return;

    const matchedProject = data.find(
      (p) => p.id.toLowerCase() === projectFromURL.toLowerCase()
    );

    if (matchedProject) {
      setSelectedProjectId(matchedProject.id.toString());
    } else {
      swal({
        title: "Project Not Found",
        text: `The project "${projectFromURL}" specified in the URL does not exist.`,
        icon: "error",
      });
    }
  }, [data]);

  return (
    <div className="ticket-shell">
      <div className="ticket-card">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create Ticket
          </button>

          <button
            className={`tab ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Tickets
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === "create" && (
            <TicketForm selectedProjectId={selectedProjectId} />
          )}

          {activeTab === "list" && (
            <TicketsSummary selectedProjectId={selectedProjectId} />
          )}
        </div>
      </div>
    </div>
  );
}

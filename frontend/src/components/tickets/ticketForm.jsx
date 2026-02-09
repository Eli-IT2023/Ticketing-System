import { useState, useEffect } from "react";
import "./css/ticketForm.css";
import swal from "sweetalert";
import api from "../../utils/axios";
import useGetProject from "../../hooks/getAllProjects";
export default function TicketForm({ selectedProjectId }) {
  const { data: data } = useGetProject();
  const [tickets, setTickets] = useState({
    project: "",
    contact_person: "",
    contact_email: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      setTickets((prev) => ({
        ...prev,
        project: selectedProjectId,
      }));
    }
  }, [selectedProjectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image && !video) {
      swal({
        title: "Warning!",
        text: "Please attach either an image or a video.",
        icon: "warning",
      });
      return;
    }

    if (isSubmitting) return; // 🚫 block double click

    swal({
      title: "Are you sure?",
      text: "Once submitted, you will not be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((proceed) => {
      if (!proceed) return;

      setIsSubmitting(true); // 🔒 lock submit

      const formData = new FormData();

      formData.append("project_id", tickets.project);
      formData.append("contact_person", tickets.contact_person);
      formData.append("contact_email", tickets.contact_email);
      formData.append("description", tickets.description);

      if (image) formData.append("image_attachment", image);
      if (video) formData.append("video_attachment", video);

      api
        .post("/tickets/createTicket", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Submitted!",
              content: {
                element: "div",
                attributes: {
                  innerHTML: `
                    ${res.data.message}<br><br>
                    <strong>Reference No:</strong> ${res.data.reference_no}
                  `,
                },
              },
              icon: "success",
            }).then(() => {
              setTickets({
                contact_person: "",
                contact_email: "",
                description: "",
              });
              setImage(null);
              setVideo(null);
            });
          }
        })
        .catch(() => {
          swal("Error!", "There was an issue submitting your ticket.", "error");
        })
        .finally(() => {
          setIsSubmitting(false); // 🔓 unlock submit
        });
    });
  };

  return (
    <div className="app-shell">
      <div className="form-container">
        <header className="form-header">
          <h2>ELI IT & BUSINESS SOLUTIONS</h2>
          <p>Please specify the concern you want to report</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Project Name</label>
            <select
              // disabled
              className="bg-light "
              placeholder="e.g. Inventory Management System"
              value={tickets.project}
              onChange={(e) =>
                setTickets({ ...tickets, project: e.target.value })
              }
              required
            >
              <option value="">Select a project</option>
              {data.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>
              Contact Person <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name and Last Name"
              value={tickets.contact_person}
              onChange={(e) =>
                setTickets({ ...tickets, contact_person: e.target.value })
              }
              required
            />
          </div>
          <div className="field">
            <label>
              Contact Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              placeholder="contactperson@gmail.com"
              value={tickets.contact_email}
              onChange={(e) =>
                setTickets({ ...tickets, contact_email: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label>
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Describe the project..."
              value={tickets.description}
              onChange={(e) =>
                setTickets({ ...tickets, description: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label>Image Attachment </label>
            <input
              type="file"
              accept="image/*"
              // value={image}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="preview"
              alt="preview"
            />
          )}

          <div className="field">
            <label>Video Attachment</label>
            <input
              type="file"
              accept="video/*"
              // value={video}
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>

          {video && (
            <video
              src={URL.createObjectURL(video)}
              className="preview"
              controls
            />
          )}

          <div className="actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

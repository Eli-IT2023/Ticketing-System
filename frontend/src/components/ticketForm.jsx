import { useState } from "react";
import "./css/ticketForm.css";

export default function TicketForm() {
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ project, description, image, video });
  };

  return (
    <div className="app-shell">
      <div className="form-container">
        <header className="form-header">
          <h2>ELI IT & BUSINESS SOLUTIONS</h2>
          <p>We are happy to assist you</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>
              Project Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Inventory Management System"
              value={project}
              onChange={(e) => setProject(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Image Attachment </label>
            <input
              type="file"
              accept="image/*"
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
            <button type="submit">Save Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

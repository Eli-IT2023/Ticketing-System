import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tickets = sequelize.define("ticket", {
  id: {
    type: DataTypes.CHAR(36), // Use STRING(36) for UUID
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  reference_no: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contact_person: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contact_email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_attachment: {
    type: DataTypes.BLOB("long"), // ✅ LONGBLOB
    allowNull: true,
  },

  video_attachment: {
    type: DataTypes.BLOB("long"), // ✅ LONGBLOB
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "NEW",
      "On Review",
      "Support Will Contact You",
      "In-progress",
      "Closed"
    ),
    allowNull: false,
    defaultValue: "NEW",
  },
});

export default Tickets;

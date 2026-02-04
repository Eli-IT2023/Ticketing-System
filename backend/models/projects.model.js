import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Projects = sequelize.define("projects", {
  id: {
    type: DataTypes.CHAR(36), // Use STRING(36) for UUID
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  project_name: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Projects;

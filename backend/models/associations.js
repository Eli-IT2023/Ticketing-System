import Projects from "./projects.model.js";
import Tickets from "./tickets.model.js";

Projects.hasMany(Tickets, { foreignKey: "project_id" });
Tickets.belongsTo(Projects, { foreignKey: "project_id" });

export { Projects, Tickets };

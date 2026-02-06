import { Projects, Tickets } from "../../../models/associations.js";
import { Op } from "sequelize";

export const generateTicketReference = async (project_id, transaction) => {
  // 1. Get project
  const project = await Projects.findByPk(project_id, {
    transaction,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  // 2. Get first word of project_name
  const prefix = project.project_name.trim().split(" ")[0].toUpperCase();

  // 3. Date parts
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  // 4. Count existing tickets for this project/year/month
  const count = await Tickets.count({
    where: {
      project_id,
      createdAt: {
        [Op.gte]: new Date(`${year}-${month}-01`),
        [Op.lt]: new Date(`${year}-${month}-31`),
      },
    },
    transaction,
  });

  // 5. Sequence
  const sequence = String(count + 1).padStart(5, "0");

  return `${prefix}-${year}-${month}-${sequence}`;
};

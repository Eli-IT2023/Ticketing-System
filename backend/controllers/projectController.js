import { Projects } from "../models/associations.js";

// Create activity log for a user
// export const createActivity = async (req, res) => {
//   try {
//     const { userId, action } = req.body;

//     // Optional: validate user exists
//     const user = await User.findByPk(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const log = await ActivityLog.create({ userId, action });
//     res.status(201).json(log);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get All projects
export const getAllProjects = async (req, res) => {
  try {
    const data = await Projects.findAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Get all logs of a specific user
// export const getLogsByUser = async (req, res) => {
//   try {
//     const logs = await ActivityLog.findAll({
//       where: { userId: req.params.userId },
//     });
//     res.status(200).json(logs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

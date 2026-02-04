import { ActivityLog, User } from "../model/associations.js";

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

// // Get all activity logs (with user info)
// export const getAllActivities = async (req, res) => {
//   try {
//     const logs = await ActivityLog.findAll({
//       include: { model: User, attributes: ["id", "username"] },
//     });
//     res.status(200).json(logs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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

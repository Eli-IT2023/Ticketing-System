import { Projects } from "../models/associations.js";

export const seedProjects = async () => {
  try {
    // Array of users to seed
    const projectsToSeed = [
      {
        project_name: "SBF Project",
      },
      {
        project_name: "Yilujia Accounting Project",
      },
      {
        project_name: "MUANA HRIS Project",
      },
      {
        project_name: "Suntech Accounting Project",
      },
    ];

    // Loop through and create each user if they don't exist
    for (const data of projectsToSeed) {
      const [proj, created] = await Projects.findOrCreate({
        where: { project_name: data.project_name },
        defaults: {
          project_name: data.project_name,
        },
      });

      if (created) {
        console.log(`✅ Created Project: ${data.project_name}`);
      } else {
        console.log(`ℹ️  Project already exists: ${data.project_name}`);
      }
    }

    console.log("✅ User seeding completed");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

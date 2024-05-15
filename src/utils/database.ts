import { Sequelize } from "sequelize";

export async function initDB() {
  const sequelize = new Sequelize("api", "me", "password", {
    host: "localhost",
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default { initDB };

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("api", "me", "password", {
  host: "localhost",
  dialect: "postgres",
});

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function syncDB() {
  await sequelize.sync();
}

export default { initDB, sequelize };

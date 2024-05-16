import { Sequelize } from "sequelize";
import "dotenv/config";

const dbObject = new Sequelize(
  process.env.DATABASE ?? "",
  process.env.USERNAME ?? "",
  process.env.PASSWORD ?? "",
  {
    host: process.env.HOST ?? "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export async function initDB() {
  try {
    await dbObject.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function syncDB() {
  await dbObject.sync();
}

export function getDBObject() {
  return dbObject;
}

export default { initDB, syncDB, getDBObject };

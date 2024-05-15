import { Sequelize } from "sequelize";

const dbObject = new Sequelize("api", "me", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

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

import { DataTypes } from "sequelize";
import { getDBObject } from "../utils/database";

export const UserRepository = getDBObject().define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
  },
);

export default { UserRepository };

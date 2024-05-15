import { DataTypes } from "sequelize";
import sequlize from "../utils/database";

export const UserRepository = sequlize.sequelize.define(
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

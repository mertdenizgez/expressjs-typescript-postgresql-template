import { DataTypes } from "sequelize";
import { getDBObject } from "../utils/database";

export const BookRepository = getDBObject().define(
  "Books",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Books",
  },
);

export default { BookRepository };

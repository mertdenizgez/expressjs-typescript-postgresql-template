import { DataTypes } from "sequelize";
import sequlize from "../utils/database";

export const BookRepository = sequlize.sequelize.define(
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

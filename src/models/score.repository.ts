import { DataTypes } from "sequelize";
import sequlize from "../utils/database";
import { BookRepository } from "./book.repository";
import { UserRepository } from "./user.repository";

export const ScoreRepository = sequlize.sequelize.define(
  "Score",
  {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BookRepository,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserRepository,
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Score",
  }
);

export default { ScoreRepository };

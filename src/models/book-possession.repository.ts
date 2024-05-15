import { DataTypes } from "sequelize";
import { getDBObject } from "../utils/database";
import { BookRepository } from "./book.repository";
import { UserRepository } from "./user.repository";

export const BookPossessionRepository = getDBObject().define(
  "BookPossession",
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
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "BookPossession",
  },
);

export default { BookPossessionRepository };

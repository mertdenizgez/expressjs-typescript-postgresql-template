import { UserRepository } from "../models/user.repository";
import { BookService, ScoreService, BookPossesionService } from "./index";
import { ErrorCodes } from "../middlewares/error-codes";

async function getUsers() {
  const users = await UserRepository.findAll();
  return users.map((user) => {
    return {
      id: user.dataValues.id,
      name: user.dataValues.name,
    };
  });
}

async function getUserById(userId: number) {
  const user = await UserRepository.findByPk(userId);

  if (!user) {
    throw new Error(ErrorCodes.USER_NOT_EXISTS);
  }

  const borrowedBooks =
    await BookPossesionService.getPossesedBooksByUserId(userId);

  if (borrowedBooks.length <= 0) {
    const books = { past: [], present: [] };
    return { ...user.dataValues, books };
  }

  const pastBooks = [];
  const presentBooks = [];
  for (const borrowedBook of borrowedBooks) {
    const bookId = borrowedBook.dataValues.bookId;

    if (!bookId) {
      continue;
    }

    const book = await BookService.getBookById(bookId);

    if (!book || !book.dataValues) {
      continue;
    }

    const score = await ScoreService.getScoreByUserIdAndBookId(userId, bookId);

    if (borrowedBook.dataValues.isReturned) {
      pastBooks.push({
        name: book?.dataValues.name,
        score: score?.dataValues.score,
      });
    } else {
      presentBooks.push({
        name: book?.dataValues.name,
      });
    }
  }

  const books = { past: pastBooks, present: presentBooks };
  return { id: user.dataValues.id, name: user.dataValues.name, books };
}

async function createUser(name: string) {
  const user = UserRepository.build({ name });
  await user.save();
}

async function borrowBook(userId: number, bookId: number) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error(ErrorCodes.USER_NOT_EXISTS);
  }
  const book = await BookService.getBookById(bookId);
  if (!book) {
    throw new Error(ErrorCodes.BOOK_NOT_EXISTS);
  }
  await BookPossesionService.barrowBook(userId, bookId);
}

async function returnBook(userId: number, bookId: number, score: number) {
  await BookPossesionService.returnBook(userId, bookId);

  const isAlreadyScored = await ScoreService.getScoreByUserIdAndBookId(
    userId,
    bookId
  );

  if (isAlreadyScored?.dataValues) {
    await ScoreService.updateScore(userId, bookId, score);
    return;
  }

  await ScoreService.createScore(userId, bookId, score);
}

export default {
  getUsers,
  getUserById,
  createUser,
  borrowBook,
  returnBook,
};

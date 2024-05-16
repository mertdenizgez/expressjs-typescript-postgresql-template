import { ErrorCodes } from "../middlewares/error-codes";
import { BookPossessionRepository } from "../models/book-possession.repository";

async function getPossesedBooksByUserId(userId: number) {
  const bookPossession = await BookPossessionRepository.findAll({
    where: { userId },
  });
  return bookPossession;
}

async function getPossesedBooksByBookId(bookId: number) {
  const bookPossession = await BookPossessionRepository.findOne({
    where: { bookId, isReturned: false },
  });
  return bookPossession;
}

async function getPossesedBooksByUserIdAndBookId(
  userId: number,
  bookId: number
) {
  const bookPossession = await BookPossessionRepository.findAll({
    where: { userId, bookId },
    order: [["createdAt", "DESC"]],
  });
  return bookPossession.map((bp) => bp.dataValues);
}

async function barrowBook(userId: number, bookId: number) {
  const isAlreadyPossesed = await getPossesedBooksByBookId(bookId);
  if (
    isAlreadyPossesed &&
    isAlreadyPossesed.dataValues &&
    !isAlreadyPossesed.dataValues.isReturned
  ) {
    throw new Error(ErrorCodes.ALREADY_BARROWED);
  }

  const bookPossession = await BookPossessionRepository.build({
    userId,
    bookId,
    isReturned: false,
  });
  bookPossession.save();
}

async function returnBook(userId: number, bookId: number) {
  const bookPossesion = await getPossesedBooksByUserIdAndBookId(userId, bookId);
  if (!bookPossesion || bookPossesion.length <= 0) {
    throw new Error(ErrorCodes.DATA_NOT_EXISTS);
  }
  await BookPossessionRepository.update(
    { isReturned: true },
    { where: { userId, bookId } }
  );
}

export default {
  getPossesedBooksByUserId,
  barrowBook,
  returnBook,
  getPossesedBooksByBookId,
};

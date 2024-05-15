import { ErrorCodes } from "../middlewares/errorCodes";
import { BookPossessionRepository } from "../models/book-possession.repository";

export async function getPossesedBooksByUserId(userId: number) {
  const bookPossession = await BookPossessionRepository.findAll({
    where: { userId },
  });
  return bookPossession;
}

export async function getPossesedBooksByUserIdAndBookId(
  userId: number,
  bookId: number,
) {
  const bookPossession = await BookPossessionRepository.findAll({
    where: { userId, bookId },
    order: [["createdAt", "DESC"]],
  });
  return bookPossession.map((bp) => bp.dataValues);
}

export async function barrowBook(userId: number, bookId: number) {
  const isAlreadyPossesed = await getPossesedBooksByUserIdAndBookId(
    userId,
    bookId,
  );
  if (
    isAlreadyPossesed &&
    isAlreadyPossesed.length > 0 &&
    !isAlreadyPossesed[0].isReturned
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

export async function returnBook(userId: number, bookId: number) {
  const bookPossesion = await getPossesedBooksByUserIdAndBookId(userId, bookId);
  if (!bookPossesion || bookPossesion.length <= 0) {
    throw new Error(ErrorCodes.DATA_NOT_EXISTS);
  }
  await BookPossessionRepository.update(
    { isReturned: true },
    { where: { userId, bookId } },
  );
}

export default {
  getPossesedBooksByUserId,
  barrowBook,
  returnBook,
};

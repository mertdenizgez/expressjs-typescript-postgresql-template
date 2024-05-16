import { BookRepository } from "../models/book.repository";
import { ScoreService } from "./index";

async function createBook(bookname: string) {
  const book = BookRepository.build({ name: bookname });
  await book.save();
}

async function getBooks() {
  const books = await BookRepository.findAll();
  return books;
}

async function getBookById(bookId: number) {
  return await BookRepository.findByPk(bookId);
}

async function getBookByIdWithAvgScore(bookId: number) {
  const book = await BookRepository.findByPk(bookId);
  if (!book) {
    throw Error("Book not found for given bookId");
  }

  const score = await ScoreService.getScoreByBookId(bookId);

  return {
    ...book.dataValues,
    score: score ? parseInt(score.dataValues.avgScore) : -1,
  };
}

export default {
  createBook,
  getBooks,
  getBookByIdWithAvgScore,
  getBookById,
};

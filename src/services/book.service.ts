import { BookRepository } from "../models/book.repository";

async function createBook(bookname: string) {
  const book = BookRepository.build({ name: bookname });
  await book.save();
}

async function getBooks() {
  const books = await BookRepository.findAll();
  return books;
}

async function getBookByIdWithAvgScore(bookId: string) {
  const book = await BookRepository.findByPk(bookId);
  return book;
}

export default {
  createBook,
  getBooks,
  getBookByIdWithAvgScore,
};

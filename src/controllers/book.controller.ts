import { Request, Response } from "express";
import bookService from "../services/book.service";

async function createBook(request: Request, response: Response) {
  const bookname = request.body.name;

  const book = await bookService.createBook(bookname);

  response.status(200).json(book);
}

async function getBooks(request: Request, response: Response) {
  const books = await bookService.getBooks();
  response.status(200).json(books);
}

async function getBookByIdWithAvgScore(request: Request, response: Response) {
  const bookId = request.params.bookId;
  const book = await bookService.getBookByIdWithAvgScore(bookId);
  response.status(200).json(book);
}

export default {
  createBook,
  getBooks,
  getBookByIdWithAvgScore,
};

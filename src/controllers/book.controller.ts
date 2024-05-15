import { Request, Response } from "express";
import bookService from "../services/book.service";
import "express-async-errors";

async function createBook(request: Request, response: Response) {
  const bookname = request.body.name;
  const book = await bookService.createBook(bookname);
  return response.status(200).json(book);
}

async function getBooks(_request: Request, response: Response) {
  const books = await bookService.getBooks();
  return response.status(200).json(books);
}

async function getBookByIdWithAvgScore(request: Request, response: Response) {
  const bookId = request.params.bookId;
  try {
    const book = await bookService.getBookByIdWithAvgScore(parseInt(bookId));
    return response.status(200).json(book);
  } catch (error) {
    return response.status(400).send("Bad request");
  }
}

export default {
  createBook,
  getBooks,
  getBookByIdWithAvgScore,
};

import { Request, Response } from "express";
import { BookService } from "../services/index";
import "express-async-errors";

async function createBook(request: Request, response: Response) {
  const bookname = request.body.name;
  const book = await BookService.createBook(bookname);
  return response.status(201).json(book);
}

async function getBooks(_request: Request, response: Response) {
  const books = await BookService.getBooks();
  return response.status(200).json(books);
}

async function getBookByIdWithAvgScore(request: Request, response: Response) {
  const bookId = request.params.bookId;
  const book = await BookService.getBookByIdWithAvgScore(parseInt(bookId));
  return response.status(200).json(book);
}

export default {
  createBook,
  getBooks,
  getBookByIdWithAvgScore,
};

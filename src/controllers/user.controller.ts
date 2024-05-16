import { UserService } from "../services/index";
import { Request, Response } from "express";
import "express-async-errors";

async function getUsers(_request: Request, response: Response) {
  const users = await UserService.getUsers();
  return response.status(200).json(users);
}

async function getUserWithBorrowHistory(request: Request, response: Response) {
  const userId = parseInt(request.params.userId);
  const user = await UserService.getUserById(userId);

  if (!user) {
    return response.status(404).json("User do not exits");
  }

  return response.status(200).json(user);
}

async function createUser(request: Request, response: Response) {
  const { name } = request.body;

  await UserService.createUser(name);
  return response.status(201).send();
}

async function borrowBook(request: Request, response: Response) {
  const { userId, bookId } = request.params;

  await UserService.borrowBook(parseInt(userId), parseInt(bookId));

  return response.status(204).send();
}

async function returnBook(request: Request, response: Response) {
  const { userId, bookId } = request.params;
  const { score } = request.body;
  await UserService.returnBook(parseInt(userId), parseInt(bookId), score);
  return response.status(204).send();
}

export default {
  getUsers,
  createUser,
  borrowBook,
  returnBook,
  getUserWithBorrowHistory,
};

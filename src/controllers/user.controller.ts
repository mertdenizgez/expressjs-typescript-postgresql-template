import userService from "../services/user.service";
import { Request, Response } from "express";
import "express-async-errors";

async function getUsers(_request: Request, response: Response) {
  const users = await userService.getUsers();
  return response.status(200).json(users);
}

async function getUserWithBorrowHistory(request: Request, response: Response) {
  const userId = parseInt(request.params.userId);
  const user = await userService.getUserById(userId);

  if (!user) {
    return response.status(404).json("User do not exits");
  }

  return response.status(200).json(user);
}

async function createUser(request: Request, response: Response) {
  const { name } = request.body;

  await userService.createUser(name);
  return response.status(201).send();
}

async function borrowBook(request: Request, response: Response) {
  const { userId, bookId } = request.params;

  await userService.borrowBook(parseInt(userId), parseInt(bookId));

  return response.status(200).send();
}

async function returnBook(request: Request, response: Response) {
  const { userId, bookId } = request.params;
  const { score } = request.body;
  try {
    await userService.returnBook(parseInt(userId), parseInt(bookId), score);
  } catch (error) {
    if (error.message === "There is no record for this query") {
      return response.status(400).send("Bad request");
    }
  }
  return response.status(200).send();
}

export default {
  getUsers,
  createUser,
  borrowBook,
  returnBook,
  getUserWithBorrowHistory,
};

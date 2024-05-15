import userService from "../services/user.service";
import { Request, Response } from "express";

function getUsers(response: Response) {
  const users = userService.getUsers();
  response.status(200).json(users);
}

function getUserById(request: Request, response: Response) {
  const userId = parseInt(request.params.id);

  const user = userService.getUserById(userId);

  response.status(200).json(user);
}

function createUser(request, response) {
  const { name } = request.body;

  const result = userService.createUser(name);
  response.status(201).send(`${result}`);
}

function borrowBook() {}

function returnBook() {}

function getUserWithBorrowHistory() {}

export default {
  getUsers,
  getUserById,
  createUser,
  borrowBook,
  returnBook,
  getUserWithBorrowHistory,
};

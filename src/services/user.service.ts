import { UserRepository } from "../models/user.repository";

async function getUsers() {
  const users = await UserRepository.findAll();
  return users;
}

async function getUserById(userId: number) {
  const user = await UserRepository.findByPk(userId);
  return user;
}

async function createUser(name: string) {
  const user = UserRepository.build({ name });
  await user.save();
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

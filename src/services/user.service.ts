import pool from "../utils/postgres";

function getUsers() {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    return results.rows;
  });
}

function getUserById(userId: number) {
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      return results.rows;
    },
  );
}

function createUser(name: string, email: string) {
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error) => {
      if (error) {
        throw error;
      }
      return "User added";
    },
  );
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

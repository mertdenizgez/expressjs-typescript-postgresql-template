import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middlewares/validator";
import { createUserSchema } from "../validations/createUser.validation";
import { returnBookSchema } from "../validations/returnBook.validation";
const router = Router();

router
  .route("/")
  .get(UserController.getUsers)
  .post(validate(createUserSchema), UserController.createUser);
router.route("/:userId").get(UserController.getUserWithBorrowHistory);
router
  .route("/:userId/return/:bookId")
  .post(validate(returnBookSchema), UserController.returnBook);
router.route("/:userId/borrow/:bookId").post(UserController.borrowBook);

export default router;

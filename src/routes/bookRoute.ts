import { Router } from "express";
import BookController from "../controllers/book.controller";
import { validate } from "../middlewares/validator";
import { createBookSchema } from "../validations/createBook.validation";

const router = Router();

router
  .route("/")
  .get(BookController.getBooks)
  .post(validate(createBookSchema), BookController.createBook);
router.route("/:bookId").get(BookController.getBookByIdWithAvgScore);

export default router;

import { Router } from "express";
import BookController from "../controllers/book.controller";

const router = Router();

router.route("/").get(BookController.getBooks).post(BookController.createBook);
router.route("/:bookId").get(BookController.getBookByIdWithAvgScore);

export default router;

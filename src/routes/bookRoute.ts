import { Router } from "express";
import BookController from "../controllers/book.controller";

const router = Router();

router.route("/").get(BookController.getBook).post(BookController.createBook);
router.route("/:score").get(BookController.getBookWithAvgScore);

export default router;

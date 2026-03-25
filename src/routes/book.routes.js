const express = require("express");
const router = express.Router();
const {
 getAllBooks,
 getBookById,
 createBook,
 updateBook,
 deleteBook,
  searchBooksByTitle,
} = require("../controllers/book.controller");
router.get("/search", searchBooksByTitle);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
module.exports = router;
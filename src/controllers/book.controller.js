const bookService = require("../services/book.service");
const getAllBooks = async (req, res, next) => {
 try {
 const books = await bookService.getAllBooks(req.query);
 res.status(200).json(books);
 } catch (error) {
 next(error);
 }
};
const getBookById = async (req, res, next) => {
 try {
 const book = await bookService.getBookById(req.params.id);
 res.status(200).json(book);
 } catch (error) {
 next(error);
 }
};
const createBook = async (req, res, next) => {
 try {
 const book = await bookService.createBook(req.body);
 res.status(201).json(book);
 } catch (error) {
 next(error);
 }
};
const updateBook = async (req, res, next) => {
 try {
 const book = await bookService.updateBook(req.params.id, req.body);
 res.status(200).json(book);
 } catch (error) {
 next(error);
 }
};
const deleteBook = async (req, res, next) => {
 try {
 await bookService.deleteBook(req.params.id);
 res.status(204).send();
 } catch (error) {
 next(error);
 }
};
const searchBooksByTitle = async (req, res, next) => {
 try {
 const { title } = req.query;
 if (!title) {
 return res.status(400).json({
 message: "O parâmetro 'title' é obrigatório",
 });
 }
 const books = await bookService.searchBooksByTitle(title);
 res.status(200).json(books);
 } catch (error) {
 next(error);
 }
};
module.exports = {
 getAllBooks,
 getBookById,
 createBook,
 updateBook,
 deleteBook,
 searchBooksByTitle,
};


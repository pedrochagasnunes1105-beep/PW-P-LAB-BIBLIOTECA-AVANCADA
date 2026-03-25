const authorService = require("../services/author.service");
const getAllAuthors = async (req, res, next) => {
 try {
 const authors = await authorService.getAllAuthors();
 res.status(200).json(authors);
 } catch (error) {
 next(error);
 }
};
const getAuthorById = async (req, res, next) => {
 try {
 const author = await authorService.getAuthorById(req.params.id);
 res.status(200).json(author);
 } catch (error) {
     next(error);
 }
};
const createAuthor = async (req, res, next) => {
 try {
 const author = await authorService.createAuthor(req.body);
 res.status(201).json(author);
 } catch (error) {
 next(error);
 }
};
const updateAuthor = async (req, res, next) => {
 try {
 const author = await authorService.updateAuthor(req.params.id, req.body);
 res.status(200).json(author);
 } catch (error) {
 next(error);
 }
};
const deleteAuthor = async (req, res, next) => {
 try {
 await authorService.deleteAuthor(req.params.id);
 res.status(204).send();
 } catch (error) {
 next(error);
 }
};
const getBooksByAuthorId = async (req, res, next) => {
 try {
 const books = await authorService.getBooksByAuthorId(req.params.id);
 res.status(200).json(books);
 } catch (error) {
 next(error);
 }
};
const getTopAuthors = async (req, res, next) => {
 try {
 const authors = await authorService.getTopAuthors();
 res.status(200).json(authors);
 } catch (error) {
 next(error);
 }
};
module.exports = {
 getAllAuthors,
 getAuthorById,
 createAuthor,
 updateAuthor,
 deleteAuthor,
 getBooksByAuthorId,
 getTopAuthors,
};

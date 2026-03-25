const prisma = require("../prisma/prismaClient");
const getAllBooks = async (query) => {
 const page = parseInt(query.page) || 1;
 const limit = parseInt(query.limit) || 10;
 const sort = query.sort;
 const skip = (page - 1) * limit;
 const take = limit;
 const allowedSortFields = ["title", "year"];
 let orderBy = { title: "asc" };
 if (sort && allowedSortFields.includes(sort)) {
 orderBy = { [sort]: "asc" };
 }
 const books = await prisma.book.findMany({
 skip,
 take,
 orderBy,
 include: {
 author: true,
 },
 });
 const total = await prisma.book.count();
 return {
 page,
 limit,
 total,
 totalPages: Math.ceil(total / limit),
 data: books,
 };
};
const getBookById = async (id) => {
 const book = await prisma.book.findUnique({
 where: { id },
 include: {
 author: true,
 },
 });
 if (!book) {
 const error = new Error("Livro não encontrado");
 error.statusCode = 404;
 throw error;
 }
 return book;
};
const createBook = async (data) => {
 const { title, year, genre, available, authorId } = data;
 if (!title || !year || !genre || !authorId) {
 const error = new Error("Campos obrigatórios em falta");
 error.statusCode = 400;
 throw error;
 }
 if (isNaN(year)) {
 const error = new Error("O campo 'year' deve ser numérico");
 error.statusCode = 400;
 throw error;
 }
 const author = await prisma.author.findUnique({
 where: { id: authorId },
 });
 if (!author) {
 const error = new Error("O autor indicado não existe");
 error.statusCode = 400;
 throw error;
 }
 return prisma.book.create({
 data: {
 title,
 year: Number(year),
 genre,
 available: available ?? true,
 authorId,
 },
 include: {
 author: true,
 },
 });
};
const updateBook = async (id, data) => {
 const { title, year, genre, available, authorId } = data;
 const existingBook = await prisma.book.findUnique({
 where: { id },
 });
 if (!existingBook) {
 const error = new Error("Livro não encontrado");
 error.statusCode = 404;
 throw error;
 }
 if (!title || !year || !genre || !authorId) {
 const error = new Error("Campos obrigatórios em falta");
 error.statusCode = 400;
 throw error;
 }
 if (isNaN(year)) {
 const error = new Error("O campo 'year' deve ser numérico");
 error.statusCode = 400;
 throw error;
 }
 const author = await prisma.author.findUnique({
 where: { id: authorId },
 });
 if (!author) {
 const error = new Error("O autor indicado não existe");
 error.statusCode = 400;
 throw error;
 }
 return prisma.book.update({
 where: { id },
 data: {
 title,
 year: Number(year),
 genre,
 available,
 authorId,
 },
 include: {
 author: true,
 },
 });
};
const deleteBook = async (id) => {
 const existingBook = await prisma.book.findUnique({
 where: { id },
 });
 if (!existingBook) {
 const error = new Error("Livro não encontrado");
 error.statusCode = 404;
 throw error;
 }
 await prisma.book.delete({
 where: { id },
 });
};
const searchBooksByTitle = async (title) => {
 return prisma.book.findMany({
 where: {
 title: {
 contains: title,
 mode: "insensitive",
 },
 },
 include: {
 author: true,
 },
 orderBy: {
 title: "asc",
 },
 });
};
module.exports = {
 getAllBooks,
 getBookById,
 createBook,
 updateBook,
 deleteBook,
 searchBooksByTitle,
};

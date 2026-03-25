const prisma = require("../prisma/prismaClient");
const getStats = async () => {
 const totalBooks = await prisma.book.count();
 const totalAuthors = await prisma.author.count();
 const availableBooks = await prisma.book.count({
 where: { available: true },
 });
 const borrowedBooks = await prisma.book.count({
 where: { available: false },
 });
 return {
 totalBooks,
 totalAuthors,
 availableBooks,
 borrowedBooks,
 };
};
const getGenresStats = async () => {
 const books = await prisma.book.findMany();
 const stats = {};
 for (const book of books) {
 if (!stats[book.genre]) {
 stats[book.genre] = 0;
 }
 stats[book.genre]++;
 }
 return stats;
};
module.exports = {
 getStats,
 getGenresStats,
};

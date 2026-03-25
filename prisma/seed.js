require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
 connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
async function main() {
 await prisma.book.deleteMany();
 await prisma.author.deleteMany();
 const authors = await prisma.author.createManyAndReturn({
 data: [
 { name: "George Orwell", nationality: "British", birthYear: 1903 },
 { name: "J.K. Rowling", nationality: "British", birthYear: 1965 },
 { name: "José Saramago", nationality: "Portuguese", birthYear: 1922 },
 { name: "Sophia de Mello Breyner", nationality: "Portuguese", birthYear: 1919 },
 { name: "J.R.R. Tolkien", nationality: "British", birthYear: 1892 }
 ]
 });
 const orwell = authors.find(a => a.name === "George Orwell");
 const rowling = authors.find(a => a.name === "J.K. Rowling");
 const saramago = authors.find(a => a.name === "José Saramago");
 const sophia = authors.find(a => a.name === "Sophia de Mello Breyner");
 const tolkien = authors.find(a => a.name === "J.R.R. Tolkien");
  await prisma.book.createMany({
 data: [
 { title: "1984", year: 1949, genre: "dystopian", available: true, authorId: orwell.id },
 { title: "Animal Farm", year: 1945, genre: "satire", available: false, authorId: orwell.id },
 { title: "Homage to Catalonia", year: 1938, genre: "history", available: true, authorId: orwell.id },
 { title: "Harry Potter and the Philosopher's Stone", year: 1997, genre: "fantasy", available: true, authorId: rowling.id
},
 { title: "Harry Potter and the Chamber of Secrets", year: 1998, genre: "fantasy", available: true, authorId: rowling.id
},
 { title: "Harry Potter and the Prisoner of Azkaban", year: 1999, genre: "fantasy", available: false, authorId:
rowling.id },
 { title: "Ensaio sobre a Cegueira", year: 1995, genre: "fiction", available: true, authorId: saramago.id },
 { title: "Memorial do Convento", year: 1982, genre: "fiction", available: true, authorId: saramago.id },
 { title: "O Homem Duplicado", year: 2002, genre: "fiction", available: false, authorId: saramago.id },
 { title: "A Menina do Mar", year: 1958, genre: "children", available: true, authorId: sophia.id },
 { title: "O Cavaleiro da Dinamarca", year: 1964, genre: "children", available: true, authorId: sophia.id },
 { title: "Histórias da Terra e do Mar", year: 1984, genre: "poetry", available: true, authorId: sophia.id },
 { title: "The Hobbit", year: 1937, genre: "fantasy", available: true, authorId: tolkien.id },
 { title: "The Fellowship of the Ring", year: 1954, genre: "fantasy", available: false, authorId: tolkien.id },
 { title: "The Two Towers", year: 1954, genre: "fantasy", available: true, authorId: tolkien.id }
 ]
 });
 console.log("Seed executado com sucesso");
}
main()
 .catch((error) => {
 console.error(error);
 process.exit(1);
 })
 .finally(async () => {
 await prisma.$disconnect();
 });

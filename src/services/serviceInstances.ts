import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { BookGenre } from "../entity/BookGenre";
import { User } from "../entity/User";

export const BookGenreRepository = AppDataSource.getRepository(BookGenre);
export const UserRepository = AppDataSource.getRepository(User);
export const BookRepository = AppDataSource.getRepository(Book);

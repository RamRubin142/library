import { Book } from '../schemas/book.schema';
export type UpdateBookDto = Omit<Book, '_id'>;

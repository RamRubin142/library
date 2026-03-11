import { Injectable, Inject } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { UsersService } from 'src/users/users.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService,
  ) {}

  async getBookById(id: string): Promise<Book | null> {
    return this.booksRepository.findOne(id);
  }

  async getBook(): Promise<Book[] | null> {
    return this.booksRepository.find();
  }

  async createBook(name: string, authorId: string): Promise<Book | null> {
    const author = new mongoose.Types.ObjectId(authorId);
    const book = (await this.booksRepository.create({
      name,
      author,
      readers: [],
    })) as any;
    if (book._id) {
      this.authorsService.addBook(authorId, book._id.toString());
    }
    return book;
  }

  async updateBook(
    id: string,
    bookUpdates: UpdateBookDto,
  ): Promise<Book | null> {
    return this.booksRepository.findOneAndUpdate(id, bookUpdates);
  }

  async removeReader(id: string, userId: string): Promise<Book | null> {
    return this.booksRepository.findOneAndDeleteReader(id, userId);
  }
  async addReader(id: string, userId: string): Promise<Book | null> {
    return this.booksRepository.findOneAndAddReader(id, userId);
  }

  async deleteBook(id: string) {
    const book = await this.booksRepository.findOne(id);
    if (book) {
      const readers = book.readers;
      readers.forEach((user) => {
        this.usersService.deleteBook((user as any)._id.toString(), id);
        if((user as any).favorite.toString() == id) {
          this.usersService.favoriteBook((user as any)._id.toString(), "");
        }
      });
      const author = book.author;
      this.authorsService.deleteBook((author as any)._id.toString(), id);
    }
    return this.booksRepository.delete(id);
  }
}

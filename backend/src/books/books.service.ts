import { Injectable, Inject } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import mongoose from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { UsersService } from 'src/users/users.service';
import { forwardRef } from '@nestjs/common';
import { SerialIdsService } from 'src/serialIds/serialIds.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService,
    private readonly serialIdsService: SerialIdsService,
  ) {}

  async getBookById(id: string): Promise<BookDocument | null> {
    return this.booksRepository.findOne(id);
  }

  async getBook(): Promise<BookDocument[] | null> {
    return this.booksRepository.find();
  }

  async createBook(
    name: string,
    authorId: string,
  ): Promise<BookDocument | null> {
    const serialId = await this.serialIdsService.getCounters("BOOKS");

    const author = new mongoose.Types.ObjectId(authorId);
    const book = await this.booksRepository.create({
      name,
      author,
      readers: [],
      serialId,
    });
    if (book._id) {
      this.authorsService.addBook(authorId, book._id.toString());
    }
    return book;
  }

  async updateBook(
    id: string,
    bookUpdates: UpdateBookDto,
  ): Promise<BookDocument | null> {
    return this.booksRepository.findOneAndUpdate(id, bookUpdates);
  }

  async removeReader(id: string, userId: string): Promise<BookDocument | null> {
    return this.booksRepository.findOneAndDeleteReader(id, userId);
  }
  async addReader(id: string, userId: string): Promise<BookDocument | null> {
    return this.booksRepository.findOneAndAddReader(id, userId);
  }

  async deleteBook(id: string) {
    const book = await this.booksRepository.findOne(id);

    if (book) {
      const readers = book.readers;
      readers.forEach(async (user) => {
        await this.usersService.deleteBook(user._id.toString(), id);

        if (user.favorite?.toString() == id) {
          await this.usersService.favoriteBook(user._id.toString(), '');
        }
      });
      const author = book.author;
      await this.authorsService.deleteBook(author._id.toString(), id);
    }
    return await this.booksRepository.delete(id);
  }
}

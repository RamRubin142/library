import { Injectable, Inject } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';

import mongoose from 'mongoose';
import { Author, AuthorDocument } from '../schemas/author.schema';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { forwardRef } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { SerialIdsService } from 'src/serialIds/serialIds.service';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly AuthorsRepository: AuthorsRepository,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
    private readonly serialIdsService: SerialIdsService,
  ) {}

  async getAuthorById(id: string): Promise<AuthorDocument | null> {
    return this.AuthorsRepository.findOne(id);
  }

  async getAuthor(): Promise<AuthorDocument[] | null> {
    return this.AuthorsRepository.find();
  }

  async createAuthor(name: string): Promise<AuthorDocument | null> {
    const serialId = await this.serialIdsService.getCounters("AUTHORS");
    return this.AuthorsRepository.create({
      name,
      books: [],
      serialId
    });
  }

  async updateAuthor(
    id: string,
    AuthorUpdates: UpdateAuthorDto,
  ): Promise<AuthorDocument | null> {
    return this.AuthorsRepository.findOneAndUpdate(id, AuthorUpdates);
  }

  async deleteAuthor(id: string) {
    const author = await this.AuthorsRepository.findOne(id);
    if (author) {
      const books = author.books;
      books.forEach((book) => {
        this.booksService.deleteBook(book._id.toString());
      });
    }
    return this.AuthorsRepository.delete(id);
  }

  async addBook(_id: string, bookId: string) {
    this.AuthorsRepository.findOneAndAddBook(_id, bookId);
  }

  async deleteBook(_id: string, bookId: string) {
    this.AuthorsRepository.findOneAndDeleteBook(_id, bookId);
  }
}

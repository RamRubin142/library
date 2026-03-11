import { Injectable, Inject } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import mongoose from 'mongoose';
import { Author } from './schemas/author.schema';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { forwardRef } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
@Injectable()
export class AuthorsService {
  constructor(
    private readonly AuthorsRepository: AuthorsRepository,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  async getAuthorById(id: string): Promise<Author | null> {
    return this.AuthorsRepository.findOne(id);
  }

  async getAuthor(): Promise<Author[] | null> {
    return this.AuthorsRepository.find();
  }

  async createAuthor(name: string): Promise<Author | null> {
    return this.AuthorsRepository.create({
      name,
      books: [],
    });
  }

  async updateAuthor(
    id: string,
    AuthorUpdates: UpdateAuthorDto,
  ): Promise<Author | null> {
    return this.AuthorsRepository.findOneAndUpdate(id, AuthorUpdates);
  }


  async deleteAuthor(id: string) {
    const author = await this.AuthorsRepository.findOne(id);
    if (author) {
      const books = author.books;
      books.forEach((book) => {
        this.booksService.deleteBook((book as any)._id.toString());
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

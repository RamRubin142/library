import { Injectable, Inject } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import mongoose from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { BooksService } from '../books/books.service';
import { forwardRef } from '@nestjs/common';
import { SerialIdsService } from 'src/serialIds/serialIds.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly UsersRepository: UsersRepository,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
    private readonly serialIdsService: SerialIdsService,
  ) {}

  async getUserById(id: string): Promise<UserDocument | null> {
    return this.UsersRepository.findOne(id);
  }

  async getUser(): Promise<UserDocument[] | null> {
    return this.UsersRepository.find();
  }

  async createUser(name: string): Promise<UserDocument | null> {
    const serialId = await this.serialIdsService.getCounters("USERS");

    return this.UsersRepository.create({
      name,
      books: [],
      favorite: null,
      serialId,
    });
  }

  async addBook(userId: string, bookId: string): Promise<UserDocument | null> {
    this.booksService.addReader(bookId, userId);
    return this.UsersRepository.findOneAndAddBook(userId, bookId);
  }
  async deleteBook(
    userId: string,
    bookId: string,
  ): Promise<UserDocument | null> {
    this.booksService.removeReader(bookId, userId);
    const user = await this.getUserById(userId);
    if (user && user.favorite && user.favorite.toString() == bookId) {
      this.UsersRepository.findOneAndFavoriteBook(userId, '');
    }
    return this.UsersRepository.findOneAndDeleteBook(userId, bookId);
  }
  async favoriteBook(
    userId: string,
    bookId: string,
  ): Promise<UserDocument | null> {
    return this.UsersRepository.findOneAndFavoriteBook(userId, bookId);
  }

  async updateUser(
    id: string,
    UserUpdates: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.UsersRepository.findOneAndUpdate(id, UserUpdates);
  }
  async deleteUser(id: string) {
    const user = await this.UsersRepository.findOne(id);
    if (user) {
      const booksRead = user.books;
      booksRead.forEach((book) => {
        this.booksService.removeReader(book._id.toString(), id);
      });
    }
    return this.UsersRepository.delete(id);
  }
}

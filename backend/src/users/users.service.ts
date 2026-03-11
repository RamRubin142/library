import { Injectable, Inject } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { BooksService } from '../books/books.service';
import { forwardRef } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(
    private readonly UsersRepository: UsersRepository,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return this.UsersRepository.findOne(id);
  }

  async getUser(): Promise<User[] | null> {
    return this.UsersRepository.find();
  }

  async createUser(name: string): Promise<User | null> {
    return this.UsersRepository.create({
      name,
      books: [],
      favorite: null,
    });
  }

  async addBook(userId: string, bookId: string): Promise<User | null> {
    this.booksService.addReader(bookId, userId);
    return this.UsersRepository.findOneAndAddBook(userId, bookId);
  }
  async deleteBook(userId: string, bookId: string): Promise<User | null> {
    this.booksService.removeReader(bookId, userId);
    const user = await this.getUserById(userId);
    if(user && user.favorite && user.favorite.toString() == bookId  ) {
      this.UsersRepository.findOneAndFavoriteBook(userId, "");
    }
    return this.UsersRepository.findOneAndDeleteBook(userId, bookId);
  }
  async favoriteBook(userId: string, bookId: string): Promise<User | null> {
    return this.UsersRepository.findOneAndFavoriteBook(userId, bookId);
  }

  async updateUser(
    id: string,
    UserUpdates: UpdateUserDto,
  ): Promise<User | null> {
    return this.UsersRepository.findOneAndUpdate(id, UserUpdates);
  }
  async deleteUser(id: string) {
    const user = await this.UsersRepository.findOne(id);
    if (user) {
      const booksRead = user.books;
      booksRead.forEach((book) => {
        this.booksService.removeReader((book as any)._id.toString(), id);
      });
    }
    return this.UsersRepository.delete(id);
  }
}

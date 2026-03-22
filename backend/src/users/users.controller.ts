import {
  Patch,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto, EditBooksDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.UsersService.getUserById(id);
  }
  @Get()
  async getUsers(): Promise<User[] | null> {
    return this.UsersService.getUser();
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.UsersService.createUser(createUserDto.name);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.UsersService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.UsersService.deleteUser(id);
  }
  @Post('/books/:id')
  async addBook(
    @Param('id') userId: string,
    @Body() editBooksDto: EditBooksDto,
  ): Promise<User | null> {
    return this.UsersService.addBook(userId, editBooksDto.bookId);
  }
  @Delete('/books/:id')
  async removeBook(
    @Param('id') userId: string,
    @Body() editBooksDto: EditBooksDto,
  ): Promise<User | null> {
    return this.UsersService.deleteBook(userId, editBooksDto.bookId);
  }
  @Patch('/books/:id')
  async favoriteBook(
    @Param('id') userId: string,
    @Body('bookId') bookId: string,
  ): Promise<User | null> {
    return this.UsersService.favoriteBook(userId, bookId);
  }
}

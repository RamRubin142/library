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
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import type { CreateBookDto } from './dto/create-book.dto';
import type { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book | null> {
    return this.BooksService.getBookById(id);
  }
  @Get()
  async getBooks(): Promise<Book[] | null> {
    return this.BooksService.getBook();
  }
  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book | null> {
    return this.BooksService.createBook(createBookDto.name, createBookDto.author);
  }
  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return this.BooksService.updateBook(id, updateBookDto);
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.BooksService.deleteBook(id);
  }
}

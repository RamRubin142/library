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
import { AuthorsService } from './authors.service';
import { Author, AuthorDocument } from '../schemas/author.schema';
import type { CreateAuthorDto } from './dto/create-author.dto';
import type { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly AuthorsService: AuthorsService) {}
  @Get(':id')
  async getAuthor(@Param('id') id: string): Promise<AuthorDocument | null> {
    return this.AuthorsService.getAuthorById(id);
  }
  @Get()
  async getAuthors(): Promise<AuthorDocument[] | null> {
    return this.AuthorsService.getAuthor();
  }
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDocument | null> {
    return this.AuthorsService.createAuthor(createAuthorDto.name);
  }
  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorDocument | null> {
    return this.AuthorsService.updateAuthor(id, updateAuthorDto);
  }
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.AuthorsService.deleteAuthor(id);
  }
}

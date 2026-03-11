import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { AuthorsService } from './authors.service';
import { BookModule } from 'src/books/books.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    forwardRef(() => BookModule),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsRepository, AuthorsService],
  exports: [AuthorsService],
})
export class AuthorModule {}

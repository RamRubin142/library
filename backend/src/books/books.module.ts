import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../schemas/book.schema';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { AuthorModule } from 'src/authors/authors.module';
import { UserModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { SerialIdsService } from 'src/serialIds/serialIds.service';
import { SerialIdsRepository } from 'src/serialIds/serialIds.repository';
import { SerialIdsModule } from 'src/serialIds/serialIds.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    AuthorModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthorModule),
    SerialIdsModule
  ],
  controllers: [BooksController],
  providers: [BooksRepository, BooksService],
  exports: [BooksService],
})
export class BookModule {}

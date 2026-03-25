import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from '../schemas/author.schema';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { AuthorsService } from './authors.service';
import { BookModule } from 'src/books/books.module';
import { forwardRef } from '@nestjs/common';
import { SerialIdsService } from 'src/serialIds/serialIds.service';
import { SerialIdsRepository } from 'src/serialIds/serialIds.repository';
import { SerialIdsModule } from 'src/serialIds/serialIds.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    forwardRef(() => BookModule),
    SerialIdsModule
  ],
  controllers: [AuthorsController],
  providers: [AuthorsRepository, AuthorsService],
  exports: [AuthorsService],
})
export class AuthorModule {}

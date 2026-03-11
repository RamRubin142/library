import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { BookModule } from './books/books.module';
import { AuthorModule } from './authors/authors.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/library'), UserModule, BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
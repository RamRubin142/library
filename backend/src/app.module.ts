import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { BookModule } from './books/books.module';
import { AuthorModule } from './authors/authors.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_STRING ?? 'mongodb://localhost/library',
    ),
    UserModule,
    BookModule,
    AuthorModule,
  ],
})
export class AppModule {}
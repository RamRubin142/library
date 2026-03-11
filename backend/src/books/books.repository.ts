import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  async findOne(_id: string): Promise<Book | null> {
    return this.BookModel.findOne({ _id })
      .populate('author')
      .populate({ path: 'readers', select: 'name _id' })
      .exec();
  }

  async find(): Promise<Book[] | null> {
    return this.BookModel.find({})
      .populate({ path: 'author', select: 'name' })
      .exec();
  }

  async findOneAndUpdate(
    _id: string,
    Book: Partial<Book>,
  ): Promise<Book | null> {
    return this.BookModel.findOneAndUpdate({ _id }, Book).exec();
  }

  async create(Book: Book): Promise<Book> {
    const newBook = new this.BookModel(Book);
    return newBook.save();
  }

  async delete(_id: string) {
    return this.BookModel.deleteOne({ _id }).exec();
  }
  async findOneAndAddReader(_id: string, userId: string): Promise<Book | null> {
    return this.BookModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          readers: userId,
        },
      },
    ).exec();
  }

  async findOneAndDeleteReader(
    _id: string,
    userId: string,
  ): Promise<Book | null> {
    return this.BookModel.findOneAndUpdate(
      { _id },
      {
        $pull: {
          readers: userId,
        },
      },
    ).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Author, AuthorDocument } from '../schemas/author.schema';
@Injectable()
export class AuthorsRepository {
  constructor(
    @InjectModel(Author.name) private AuthorModel: Model<AuthorDocument>,
  ) {}

  async findOne(_id: string): Promise<AuthorDocument | null> {
    return this.AuthorModel.findOne({ _id })
      .populate({ path: 'books', select: '_id name serialId' })
      .exec();
  }

  async find(): Promise<AuthorDocument[] | null> {
    return this.AuthorModel.find({}).exec();
  }

  async findOneAndUpdate(
    _id: string,
    Author: Partial<Author>,
  ): Promise<AuthorDocument | null> {
    return this.AuthorModel.findOneAndUpdate({ _id }, Author).exec();
  }

  async create(Author: Author): Promise<AuthorDocument> {
    const newAuthor = new this.AuthorModel(Author);
    return newAuthor.save();
  }

  async delete(_id: string) {
    return this.AuthorModel.deleteOne({ _id }).exec();
  }

  async findOneAndAddBook(
    _id: string,
    bookId: string,
  ): Promise<AuthorDocument | null> {
    return this.AuthorModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          books: bookId,
        },
      },
    ).exec();
  }

  async findOneAndDeleteBook(
    _id: string,
    bookId: string,
  ): Promise<AuthorDocument | null> {
    return this.AuthorModel.findOneAndUpdate(
      { _id },
      {
        $pull: {
          books: bookId,
        },
      },
    ).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findOne(_id: string): Promise<User | null> {
    return this.UserModel.findOne({ _id })
      .populate({
        path: 'books', 
        populate: {
          path: 'author', 
          select: 'name', 
        },
      })
      .exec();
  }

  async find(): Promise<User[] | null> {
    return this.UserModel.find({}).exec();
  }

  async findOneAndUpdate(
    _id: string,
    User: Partial<User>,
  ): Promise<User | null> {
    return this.UserModel.findOneAndUpdate({ _id }, User).exec();
  }

  async create(User: User): Promise<User> {
    const newUser = new this.UserModel(User);
    return newUser.save();
  }

  async delete(_id: string) {
    return this.UserModel.deleteOne({ _id }).exec();
  }

  async findOneAndAddBook(_id: string, bookId: string): Promise<User | null> {
    return this.UserModel.findOneAndUpdate(
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
  ): Promise<User | null> {
    return this.UserModel.findOneAndUpdate(
      { _id },
      {
        $pull: {
          books: bookId,
        },
      },
    ).exec();
  }

  async findOneAndFavoriteBook(
    _id: string,
    bookId: string,
  ): Promise<User | null> {
    if (bookId != '') {
      return this.UserModel.findOneAndUpdate(
        { _id },
        {
          favorite: bookId,
        },
      ).exec();
    } else {
      return this.UserModel.findOneAndUpdate(
        { _id },
        {
          favorite: null,
        },
      ).exec();
    }
  }
}

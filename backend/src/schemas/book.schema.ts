import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import mongoose from 'mongoose';
import { Author, AuthorDocument } from './author.schema';
import { User, UserDocument } from './user.schema';
export type BookDocument = Book & {
  _id: mongoose.Types.ObjectId;
} & Document;
@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: AuthorDocument | Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  readers: UserDocument[];
  @Prop()
  serialId: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import mongoose from 'mongoose';
import { Author } from '../../authors/schemas/author.schema';
import { User } from '../../users/schemas/user.schema';
export type BookDocument = Book & Document;
@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author | Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  readers: User[];
}
export const BookSchema = SchemaFactory.createForClass(Book);

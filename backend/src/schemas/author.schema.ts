import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Book, BookDocument } from './book.schema';
export type AuthorDocument = Author & {
  _id: mongoose.Types.ObjectId;
}  & Document;
@Schema()
export class Author {


  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books: BookDocument[];

  @Prop()
  serialId : string;
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Book } from '../../books/schemas/book.schema';
export type AuthorDocument = Author & Document;
@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books: Book[];
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

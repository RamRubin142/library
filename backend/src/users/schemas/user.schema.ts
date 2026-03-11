import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book } from '../../books/schemas/book.schema';
import mongoose from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books: Book[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default : null })
  favorite: Book | null;
}
export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import mongoose from 'mongoose';
export type UserDocument = User & {
  _id: mongoose.Types.ObjectId;
} & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books: BookDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: null })
  favorite: Book | null;
  @Prop()
  serialId: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

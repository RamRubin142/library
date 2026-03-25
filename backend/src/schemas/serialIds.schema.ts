import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import mongoose from 'mongoose';
export type SerialIdsDocument = SerialIds & {
  _id: mongoose.Types.ObjectId;
} & Document;
@Schema()
export class SerialIds {
  @Prop ()
  name : string;
  @Prop({
    default: 0,
  })
  usersCounter: Number;
  @Prop({
    default: 0,
  })
  authorsCounter: Number;

  @Prop({
    default: 0,
  })
  booksCounter: Number;
}
export const SerialIdsSchema = SchemaFactory.createForClass(SerialIds);

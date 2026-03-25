import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SerialIds, SerialIdsDocument } from '../schemas/serialIds.schema';
const NAME_FOR_COUNTERS = "easter_egg";
@Injectable()
export class SerialIdsRepository {
  constructor(
    @InjectModel(SerialIds.name) private SerialIdsModel: Model<SerialIdsDocument>,
  ) {}

  async onModuleInit() {
    await this.SerialIdsModel.findOneAndUpdate(
      { name: NAME_FOR_COUNTERS },
      {
        $setOnInsert: {
          authorsCounter: 0,
          booksCounter: 0,
          usersCounter: 0,
        },
      },
      { upsert: true },
    );
  }

  async getAndincrementCounter(counter : string) : Promise<string | undefined> {
    const counters = await this.SerialIdsModel.findOne({ name: NAME_FOR_COUNTERS }).exec();
    if (counter == "AUTHORS") {
        await this.SerialIdsModel.findOneAndUpdate(
          { name: NAME_FOR_COUNTERS },
          { $inc: { authorsCounter: 1 } },
        ).exec();
        return counters?.authorsCounter.toString()
    }
    if (counter == 'BOOKS') {
      await this.SerialIdsModel.findOneAndUpdate(
        { name: NAME_FOR_COUNTERS },
        { $inc: { booksCounter: 1 } },
      ).exec();
      return counters?.booksCounter.toString();
    }
    if (counter == 'USERS') {
      await this.SerialIdsModel.findOneAndUpdate(
        { name: NAME_FOR_COUNTERS },
        { $inc: { usersCounter: 1 } },
      ).exec();
      return counters?.usersCounter.toString();
    }
  }


}

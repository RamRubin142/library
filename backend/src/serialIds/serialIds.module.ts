import { MongooseModule } from '@nestjs/mongoose';
import { SerialIds, SerialIdsSchema } from '../schemas/serialIds.schema';
import { Module } from '@nestjs/common';
import { SerialIdsRepository } from './serialIds.repository';
import { SerialIdsService } from './serialIds.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SerialIds.name, schema: SerialIdsSchema }]),
  ],
  providers: [
    SerialIdsService,
    SerialIdsRepository,
  ],
  exports: [SerialIdsService],
})
export class SerialIdsModule {}

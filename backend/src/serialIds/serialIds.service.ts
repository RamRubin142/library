import { Injectable, Inject } from '@nestjs/common';
import { SerialIdsRepository } from './serialIds.repository';
import { SerialIds, SerialIdsDocument } from '../schemas/serialIds.schema';


@Injectable()
export class SerialIdsService {
  constructor(private readonly serialIdsRepository: SerialIdsRepository) {}

  async getCounters(counter : string): Promise<string> {
    const result = await this.serialIdsRepository.getAndincrementCounter(counter);
    if(!result) {
        return "0";
    }
    return result;
  }

}

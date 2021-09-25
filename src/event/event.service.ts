import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventService {
  scrape() {
    return 'This action adds a new event';
  }
}

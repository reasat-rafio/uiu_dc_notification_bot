import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation('scrapeEvent')
  create() {
    return this.eventService.scrape();
  }
}

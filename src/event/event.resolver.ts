import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { PrismaService } from '../prisma/prisma.service';
import { Client, ClientProvider } from 'discord-nestjs';
import { Cron } from '@nestjs/schedule';

@Resolver('Event')
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

  @Cron('5 * * * * *')
  @Mutation('scrapeEvent')
  create() {
    console.log('====================================');
    console.log('adas');
    console.log('====================================');

    return this.eventService.scrape();
  }
}

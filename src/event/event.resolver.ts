import { Message } from 'discord.js';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { PrismaService } from '../prisma/prisma.service';
import { Client, ClientProvider, OnCommand } from 'discord-nestjs';
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
    return this.eventService.scrape();
  }

  @OnCommand({ name: 'recent' })
  async recentEvent(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const recentEvent = await this.prisma.event.findFirst({ take: -1 });
    const embdData = this.eventService.check(recentEvent);
    await message.channel.send(embdData);
  }
}

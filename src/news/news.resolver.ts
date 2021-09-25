import { Mutation, Resolver } from '@nestjs/graphql';
import { Cron } from '@nestjs/schedule';
import { Client, ClientProvider, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from './news.service';

@Resolver('News')
export class NewsResolver {
  constructor(
    private readonly newsService: NewsService,
    private readonly prisma: PrismaService,
  ) {}
  @Client()
  discordProvider: ClientProvider;

  @Cron('0 */30 * * * *')
  @Mutation('scrapeEvent')
  create() {
    return this.newsService.scrape();
  }

  @OnCommand({ name: 'recent' })
  async recentEvent(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const recentEvent = await this.prisma.news.findFirst({ take: -1 });
    const embdData = this.newsService.check(recentEvent);
    await message.channel.send(embdData);
  }
}

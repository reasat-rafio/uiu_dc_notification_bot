import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProvider, On, Once, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { BotService } from './bot.service';
import { Cron } from '@nestjs/schedule';
import { Mutation } from '@nestjs/graphql';

@Injectable()
export class BotHandler {
  private readonly logger = new Logger(BotHandler.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly botservice: BotService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  start(): void {
    console.log(
      this.discordProvider.getClient().guilds.cache.map((g) => g.name),
    );
    this.logger.log(`Logged in`);
  }

  // @Cron('5 * * * * *')
  @On({ event: 'ready' })
  @Cron('0 */30 * * * *')
  @Mutation('scrape')
  async scrapeAll() {
    return this.botservice.scrape();
  }

  @OnCommand({ name: 'recent' })
  async recentNotification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const recentNotification = await this.prisma.data.findFirst({ take: -1 });
    const embdData = this.botservice.check(recentNotification);
    await message.channel.send(embdData);
  }

  @OnCommand({ name: 'last5' })
  async last5Notification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const data = await this.prisma.data.findMany({ take: -5 });
    const embdData = this.botservice.checkMany(data);
    embdData.map(async (e) => await message.channel.send(e));
  }

  @OnCommand({ name: 'last10' })
  async last10Notification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const data = await this.prisma.data.findMany({ take: -10 });
    const embdData = this.botservice.checkMany(data);
    embdData.map(async (e) => await message.channel.send(e));
  }
}

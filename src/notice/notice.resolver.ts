import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProvider, On, Once, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { NoticeService } from './notice.service';
import { Cron } from '@nestjs/schedule';
import { Mutation } from '@nestjs/graphql';

@Injectable()
export class NoticeResolver {
  private readonly logger = new Logger(NoticeResolver.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly noticeService: NoticeService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  start(): void {
    //added servers
    console.log(
      this.discordProvider.getClient().guilds.cache.map((g) => g.name),
    );

    this.discordProvider.getClient().user.setPresence({
      activity: {
        name: 'for !notice',
        type: 'WATCHING',
      },
    });
    this.logger.log(`Logged in`);
  }

  @Cron('0 */30 * * * *')
  @On({ event: 'ready' })
  @Mutation()
  async scrapeNotice() {
    return this.noticeService.scrape();
  }

  @OnCommand({ name: 'recent' })
  async recentNotification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const recentNotification = await this.prisma.notice.findFirst({ take: -1 });
    const embdData = this.noticeService.check(recentNotification);
    await message.channel.send(embdData);
  }
}

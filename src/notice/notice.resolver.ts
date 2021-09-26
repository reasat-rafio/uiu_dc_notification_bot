import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Client, ClientProvider, On, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { NoticeService } from './notice.service';
import { Cron } from '@nestjs/schedule';
import { Mutation } from '@nestjs/graphql';

@Injectable()
export class NoticeResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly noticeService: NoticeService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

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

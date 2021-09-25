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

  @On({ event: 'message' })
  async getText(message: Message) {
    if (message.author.bot) {
      return;
    }

    if (message.content.charAt(0) === '-') {
      if (message.content === '-recent') {
        return;
      }

      if (message.content.includes('last')) {
        const wantedVluesNum = +message.content.slice(
          5,
          message.content.length,
        );
        const totalDataCount = await this.prisma.notice.count({});

        if (wantedVluesNum && wantedVluesNum <= totalDataCount) {
          const notices = await this.prisma.notice.findMany({
            take: -wantedVluesNum,
          });

          const embdNotices = this.noticeService.checkMany(notices);

          embdNotices.map(async (e) => await message.channel.send(e));
        } else {
          const outOfDBLimitError =
            this.noticeService.recordLimitOutOfTheDBLimit(totalDataCount);
          await message.channel.send(outOfDBLimitError);
        }
      } else {
        const notValidError = this.noticeService.notValidCommand(
          message.content,
        );
        await message.channel.send(notValidError);
      }
    }
  }

  @Cron('5 * * * * *')
  @On({ event: 'ready' })
  // @Cron('0 */30 * * * *')
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

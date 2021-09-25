import { Controller, Get } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { On } from 'discord-nestjs';
import { Message } from 'discord.js';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @On({ event: 'message' })
  async getText(message: Message) {
    if (message.author.bot) {
      return;
    }

    if (message.content.charAt(0) === '-') {
      if (message.content === '-recent') {
        return;
      }

      if (message.content.includes('notice')) {
        const wantedVluesNum = +message.content.slice(
          'notice'.length + 1,
          message.content.length,
        );

        const totalNoticeCount = await this.prisma.notice.count({});

        if (!wantedVluesNum) {
          await message.reply(
            `Please specify a number after the command\n eg: -${message.content}2`,
          );
        } else if (wantedVluesNum && wantedVluesNum <= totalNoticeCount) {
          const notices = await this.prisma.notice.findMany({
            take: -wantedVluesNum,
          });

          const embdNotices = this.appService.checkMany(notices, 'NOTICE!!');

          embdNotices.map(async (e) => await message.channel.send(e));
        } else {
          const outOfDBLimitError =
            this.appService.recordLimitOutOfTheDBLimit(totalNoticeCount);
          await message.channel.send(outOfDBLimitError);
        }
      } else if (message.content.includes('news')) {
        const wantedVluesNum = +message.content.slice(
          'news'.length + 1,
          message.content.length,
        );
        const totalNewsCount = await this.prisma.news.count({});

        if (wantedVluesNum && wantedVluesNum <= totalNewsCount) {
          const news = await this.prisma.notice.findMany({
            take: -wantedVluesNum,
          });

          const embdNotices = this.appService.checkMany(news, 'NEWS!!');

          embdNotices.map(async (e) => await message.channel.send(e));
        } else {
          const outOfDBLimitError =
            this.appService.recordLimitOutOfTheDBLimit(totalNewsCount);
          await message.channel.send(outOfDBLimitError);
        }
      } else if (message.content.includes('event')) {
        const wantedVluesNum = +message.content.slice(
          'event'.length + 1,
          message.content.length,
        );
        const totalEventCount = await this.prisma.news.count({});

        if (wantedVluesNum && wantedVluesNum <= totalEventCount) {
          const event = await this.prisma.news.findMany({
            take: -wantedVluesNum,
          });

          const embdNotices = this.appService.checkMany(event, 'EVENTS!!');

          embdNotices.map(async (e) => await message.channel.send(e));
        } else {
          const outOfDBLimitError =
            this.appService.recordLimitOutOfTheDBLimit(totalEventCount);
          await message.channel.send(outOfDBLimitError);
        }
      } else {
        const notValidError = this.appService.notValidCommand(message.content);
        await message.channel.send(notValidError);
      }
    }
  }
}

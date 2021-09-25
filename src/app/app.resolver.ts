import { Resolver } from '@nestjs/graphql';
import { On, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import config from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @OnCommand({ name: 'help' })
  async help(message: Message): Promise<void> {
    await message.channel.send(
      config
        .defaultEmbed(config.colors.message)
        .setTitle(`Hello there!`)
        .setDescription(
          'currently available commands : \n 👉 -help \n 👉 -recent \n 👉 -notice<NUMBER> eg: -notice2 \n 👉 -news<NUMBER> eg: -news3 \n 👉 -event<NUMBER> eg: -event4 \n\n Want to request a new feature or report a bug? Please knock me here: https://www.facebook.com/alreasat.rafio',
        )
        .setThumbnail(config.thumbnails.help),
    );
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

      if (message.content === '-help') {
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

          const embdNotices = this.appService
            .checkMany(notices, 'NOTICE!!')
            .reverse();

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
          const news = await this.prisma.news.findMany({
            take: -wantedVluesNum,
          });

          const embdNews = this.appService.checkMany(news, 'NEWS!!').reverse();

          embdNews.map(async (e) => await message.channel.send(e));
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
        const totalEventCount = await this.prisma.event.count({});

        if (wantedVluesNum && wantedVluesNum <= totalEventCount) {
          const event = await this.prisma.event.findMany({
            take: -wantedVluesNum,
          });

          const embdEvents = this.appService
            .checkMany(event, 'EVENTS!!')
            .reverse();

          embdEvents.map(async (e) => await message.channel.send(e));
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

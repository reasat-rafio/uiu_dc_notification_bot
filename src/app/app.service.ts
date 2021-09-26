import { Notice } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { MessageEmbed } from 'discord.js';
import config from '../config';

const { defaultEmbed } = config;

@Injectable()
export class AppService {
  checkMany(messages: Notice[], to: string): MessageEmbed[] {
    let icon: string;

    switch (to) {
      case 'NEWS!!':
        icon = config.images.news;
        break;

      case 'NOTICE!!':
        icon = config.images.notice;
        break;

      case 'EVENTS!!':
        icon = config.images.event;
        break;

      default:
        icon = '';
    }

    const embed = messages.map((d) =>
      defaultEmbed(config.colors.alerts)
        .setTitle(d.title)
        .setDescription(
          `👉 ${to} \n 
          ${d.content}`,
        )
        .setTimestamp(d.createdDate)
        .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
        .setAuthor('United International University', process.env.IMG_URL)
        .setThumbnail(icon),
    );

    return embed;
  }

  // updateMsg() {
  //   return defaultEmbed(config.colors.alerts)
  //     .setTitle('UPDATE AND CHANGES!')
  //     .setDescription(
  //       `
  //     Newly added:\n
  //     currently, the bot not only checks for notice but also checks for news and events from the UIU website.\n
  //     \n
  //     changes:\n
  //     ~~ The command prefix is now - (single hyphen) instead of -- (double hyphen)
  //     -recent will now return the recent news, notice, and events from the UIU website\n
  //     ~~ -last5 and -last10 command has been removed. Now you specify why you want (notice, event, or news) and the quantity eg: -notice3, -news2. This will return the last 3 notices or 2 news\n
  //     \n
  //     Currently available commands:\n
  //     -help\n
  //     -recent\n
  //     -notice<NUMBER> eg: -notice2\n
  //     -news<NUMBER> eg: -news3\n
  //     -EVENT<NUMBER> EG: -EVENT4\n
  //     \n
  //     YOU DO NOT NEED TO CALL COMMANDS EVERY TIME. THE BOT WILL SEND AN AUTOMATED MESSAGE WHEN THERE IS A NEW NOTICE, NEWS, OR EVENT.\n
  //     I am aware of the bot not sending the response in the right order now. This issue will fix eventually when there will be new content added to the UIU website. I am too lazy to fix it manually.\n
  //     \n
  //     Hope this serves a purpose haha. Thank you`,
  //     )
  //     .setAuthor('United International University', process.env.IMG_URL)
  //     .setThumbnail(config.thumbnails.update);
  // }

  recordLimitOutOfTheDBLimit(totalDataCount: number) {
    const embedOutOfLimitErr = defaultEmbed(config.colors.error)
      .setTitle('~ Sad bot noise (╥_╥) ~')
      .setDescription(
        `Currently I only have ${totalDataCount} records. I can't serve you more or less than that`,
      )
      .setThumbnail(config.thumbnails.outOfDBLimit);

    return embedOutOfLimitErr;
  }

  notValidCommand(message: string) {
    const embedNotValidCmd = config
      .defaultEmbed(config.colors.error)
      .setTitle(`${message} is not a valid command`)
      .setDescription(
        'availables commands are:\n 👉 -help \n 👉 -recent \n 👉 -notice<NUMBER> eg: -notice2 \n 👉 -news<NUMBER> eg: -news3 \n 👉 -event<NUMBER> eg: -event4',
      )
      .setThumbnail(config.thumbnails.notValidCommand);

    return embedNotValidCmd;
  }
}

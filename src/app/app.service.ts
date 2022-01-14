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
          ${d.content} \n
          \n
        ℹ️ Created by [Al Reasat Rafio](https://github.com/reasat-rafio)`,
        )
        .setTimestamp(d.createdDate)
        .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
        .setAuthor('United International University', process.env.IMG_URL)
        .setThumbnail(icon),
    );

    return embed;
  }

  updateMsg() {
    return defaultEmbed(config.colors.alerts)
      .setTitle("Good Byen't")
      .setDescription(
        `Bot is shutting down and won't be available 24/7 due to my free hosting trail ended lol.\n
      \n
        Maybe in near future I will be back again so don't kick the bot out yet. Till than good bye [ ± _ ± ]`,
      )
      .setAuthor('United International University', process.env.IMG_URL)
      .setThumbnail(config.thumbnails.update);
  }

  recordLimitOutOfTheDBLimit(totalDataCount: number) {
    const embedOutOfLimitErr = defaultEmbed(config.colors.error)
      .setTitle('~ Sad bot noise (╥_╥) ~')
      .setDescription(
        `Currently I only have ${totalDataCount} records. I can't serve you more than that`,
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

import { Data } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { MessageEmbed } from 'discord.js';
import config from '../config';

const { defaultEmbed, alexWhitelist, preventWords } = config;
@Injectable()
export class BotService {
  check(messages: Data[]): MessageEmbed[] {
    const embed = messages.map((d) =>
      defaultEmbed(config.colors.alerts)
        .setTitle(d.title)
        .setDescription(d.content)
        .setTimestamp(d.createdDate)
        .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
        .setAuthor('UIU', process.env.IMG_URL),
    );

    return embed;
  }
}

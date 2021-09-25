import { News } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { MessageEmbed } from 'discord.js';
import { NestCrawlerService } from 'nest-crawler';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import config from '../config';

const { defaultEmbed } = config;

interface NewsScrappingData {
  title: string;
  content: string;
  slug?: string;
}

@Injectable()
export class NewsService {
  constructor(
    private readonly crawler: NestCrawlerService,
    private readonly prisma: PrismaService,
  ) {}

  formetNoticeData = (data: NewsScrappingData): NewsScrappingData[] => {
    const result = [];

    console.log(data);

    return result;
  };

  check(messages: News): MessageEmbed {
    const embed = defaultEmbed(config.colors.alerts)
      .setTitle(`${messages.title}`)
      .setDescription(
        `👉 NOTICE! \n 
            ${messages.content}`,
      )
      .setTimestamp(messages.createdDate)
      .setURL(`https://www.uiu.ac.bd/news/${messages.slug}`)
      .setAuthor('United International University', process.env.IMG_URL)
      .setThumbnail(config.images.news);

    return embed;
  }

  async scrape(): Promise<void> {
    const data: NewsScrappingData = await this.crawler.fetch({
      target: 'https://www.uiu.ac.bd/?post_type=news',
      fetch: {
        title: {
          selector: '.entry-header',
        },
        content: {
          selector: '.entry-content',
        },
      },
    });

    console.log(data);
  }
}

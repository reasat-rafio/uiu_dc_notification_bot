import { News } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Client, DiscordClientProvider } from 'discord-nestjs';
import { MessageEmbed, TextChannel } from 'discord.js';
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
  @Client()
  discordProvider: DiscordClientProvider;

  formetNoticeData = (data: NewsScrappingData): NewsScrappingData[] => {
    let title: string[] = [];
    let content: string[] = [];
    let slug: void | string[] = [];

    const result = [];

    console.log(data);

    title = data.title
      .replace(/\r?\n|\r/g, ' ')
      .split('      ')
      .filter((e) => e);
    title = title[0].split('\t\t\t');

    content = data.content.split('Read More…');

    slug = title.map((e: string): string =>
      slugify(e, { remove: /[*+~.()'"!:@]/g, lower: true, strict: true }),
    );
    title.map(
      (e, index) => (result[index] = { ...result[index], title: e.trim() }),
    );
    content.map(
      (e, index) => (result[index] = { ...result[index], content: e.trim() }),
    );
    slug.map((e, index) => (result[index] = { ...result[index], slug: e }));

    result.pop();

    return result;
  };

  check(messages: News): MessageEmbed {
    const embed = defaultEmbed(config.colors.alerts)
      .setTitle(`${messages.title}`)
      .setDescription(
        `👉 NEWS! \n 
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
          selector: '.entry-content p',
        },
      },
    });

    const formetedData: NewsScrappingData[] = this.formetNoticeData(data);

    formetedData.map(async (data): Promise<News> => {
      try {
        const notificationExist = await this.prisma.news.findFirst({
          where: {
            title: data.title,
          },
        });
        if (!notificationExist) {
          try {
            const newNotifications = await this.prisma.news.create({
              data: {
                title: data.title,
                content: data.content,
                slug: data.slug,
              },
            });

            this.discordProvider
              .getClient()
              .guilds.cache.each(async (guild) => {
                try {
                  const channels: any = guild.channels.cache
                    .filter((channel) => {
                      return (
                        channel.type === 'text' &&
                        channel
                          .permissionsFor(guild.me)
                          .has(['VIEW_CHANNEL', 'SEND_MESSAGES'])
                      );
                    })
                    .find((c) => c.name === 'general' || c.position === 0);

                  if (channels) {
                    const embdData = this.check(newNotifications);
                    await (channels as TextChannel).send(embdData);
                  }
                } catch (error) {
                  console.log(error);
                }
              });

            return newNotifications;
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
}

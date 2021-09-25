import { Notice } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { MessageEmbed, TextChannel } from 'discord.js';
import config from '../config';
import slugify from 'slugify';
import { NestCrawlerService } from 'nest-crawler';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client, DiscordClientProvider } from 'discord-nestjs';
import { CreateScraping } from './dto/create-scraping.input';

interface NoticeScrappingData {
  title: string;
  content: string;
}

const { defaultEmbed } = config;

@Injectable()
export class NoticeService {
  constructor(
    private readonly crawler: NestCrawlerService,
    private readonly prisma: PrismaService,
  ) {}

  @Client()
  discordProvider: DiscordClientProvider;

  formetNoticeData = (data: NoticeScrappingData): CreateScraping[] => {
    let title: string[] = [];
    let content: string[] = [];
    let slug: void | string[] = [];

    const result = [];

    title = data.title
      .replace(/\r?\n|\r/g, ' ')
      .split('      ')
      .filter((e) => e);
    content = data.content.split('\n');

    slug = title.map((e: string): string =>
      slugify(e, { remove: /[*+~.()'"!:@]/g, lower: true, strict: true }),
    );
    title.map(
      (e, index) => (result[index] = { ...result[index], title: e.trim() }),
    );
    content.map((e, index) => {
      if (e.includes('Share This')) {
        return (result[index] = {
          ...result[index],
          content: e.slice('Share This'.length + 1, e.trim().length).trim(),
        });
      }

      return (result[index] = { ...result[index], content: e.trim() });
    });
    slug.map((e, index) => (result[index] = { ...result[index], slug: e }));

    result.pop();

    return result;
  };

  checkMany(messages: Notice[]): MessageEmbed[] {
    const embed = messages.map((d) =>
      defaultEmbed(config.colors.alerts)
        .setTitle(d.title)
        .setDescription(d.content)
        .setTimestamp(d.createdDate)
        .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
        .setAuthor('United International University', process.env.IMG_URL)
        .setThumbnail(config.images.notice),
    );

    return embed;
  }

  check(messages: Notice): MessageEmbed {
    const embed = defaultEmbed(config.colors.alerts)
      .setTitle(`${messages.title}`)
      .setDescription(
        `👉 NOTICE! \n 
        ${messages.content}`,
      )
      .setTimestamp(messages.createdDate)
      .setURL(`https://www.uiu.ac.bd/notices/${messages.slug}`)
      .setAuthor('United International University', process.env.IMG_URL)
      .setThumbnail(config.images.notice);

    return embed;
  }

  async scrape(): Promise<void> {
    const data: NoticeScrappingData = await this.crawler.fetch({
      target: 'https://www.uiu.ac.bd/notices',
      fetch: {
        title: {
          selector: '.entry-header',
        },
        content: {
          selector: '.event-list-excerpt',
        },
      },
    });

    const formetedData: CreateScraping[] = this.formetNoticeData(data);

    formetedData.map(async (data): Promise<Notice> => {
      try {
        const notificationExist = await this.prisma.notice.findFirst({
          where: {
            title: data.title,
          },
        });
        if (!notificationExist) {
          try {
            const newNotifications = await this.prisma.notice.create({
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

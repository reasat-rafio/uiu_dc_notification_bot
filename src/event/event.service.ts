import { MessageEmbed, TextChannel } from 'discord.js';
import { Client, DiscordClientProvider } from 'discord-nestjs';
import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { NestCrawlerService } from 'nest-crawler';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import config from '../config';

interface EventScrappingData {
  title: string;
  content: string;
  venue: string;
  date: string;
  slug?: string;
}

const { defaultEmbed } = config;

@Injectable()
export class EventService {
  constructor(
    private readonly crawler: NestCrawlerService,
    private readonly prisma: PrismaService,
  ) {}

  @Client()
  discordProvider: DiscordClientProvider;

  formetEventData = (data: EventScrappingData): EventScrappingData[] => {
    let title: string[] = [];
    let content: string[] = [];
    let slug: void | string[] = [];
    let date: string[] = [];
    let venue: string[] = [];

    const result = [];

    title = data.title
      .replace(/\r?\n|\r/g, ' ')
      .split('      ')
      .filter((e) => e);
    content = data.content.split('\n');
    slug = title.map((e: string): string =>
      slugify(e, { remove: /[*+~.()'"!:@]/g, lower: true, strict: true }),
    );
    date = data.date.split('Date:');
    date.shift();
    venue = data.venue.split('Venue :');
    venue.shift();

    title.map(
      (e, index) => (result[index] = { ...result[index], title: e.trim() }),
    );
    content.map(
      (e, index) => (result[index] = { ...result[index], content: e.trim() }),
    );
    slug.map((e, index) => (result[index] = { ...result[index], slug: e }));
    date.map(
      (e, index) => (result[index] = { ...result[index], date: e.trim() }),
    );
    venue.map(
      (e, index) => (result[index] = { ...result[index], venue: e.trim() }),
    );

    result.pop();

    return result;
  };

  async scrape() {
    const data: EventScrappingData = await this.crawler.fetch({
      target: 'https://www.uiu.ac.bd/?post_type=event',
      fetch: {
        title: {
          selector: '.entry-header',
        },
        date: { selector: '.event-list-date' },
        venue: { selector: '.event-list-venu' },
        content: {
          selector: '.event-list-excerpt',
        },
      },
    });

    const formetedData = this.formetEventData(data);

    formetedData.map(async (data): Promise<Event> => {
      try {
        const eventExist = await this.prisma.event.findFirst({
          where: {
            title: data.title,
          },
        });
        if (!eventExist) {
          try {
            const newNotifications = await this.prisma.event.create({
              data: {
                title: data.title,
                date: data.date,
                content: data.content,
                slug: data.slug,
                venue: data.venue,
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

  check(messages: Event): MessageEmbed {
    const embed = defaultEmbed(config.colors.alerts)
      .setTitle(`${messages.title}`)
      .setDescription(
        `
        👉 EVENT! \n
        🕒 Date: ${messages.date} \n 
        📍 Venue: ${messages.venue} \n
        ${messages.content}`,
      )
      .setTimestamp(messages.createdDate)
      .setURL(`https://www.uiu.ac.bd/events/${messages.slug}`)
      .setAuthor('United International University', process.env.IMG_URL)
      .setThumbnail(config.images.event);

    return embed;
  }
}

import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';

interface EventScrappingData {
  title: string;
  content: string;
  venue: string;
  date: string;
  slug?: string;
}

@Injectable()
export class EventService {
  constructor(
    private readonly crawler: NestCrawlerService,
    private readonly prisma: PrismaService,
  ) {}

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

    // ? removing this will show a unrelatable value that we dont want
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

    return 'This action adds a new event';
  }
}

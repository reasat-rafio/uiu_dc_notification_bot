import { Message } from 'discord.js';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import { CreateScraping } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';
import slugify from 'slugify';
import { Data } from '@prisma/client';
import { Client, ClientProvider, On } from 'discord-nestjs';

interface SData {
  title: string;
  content: string;
}

@Injectable()
export class ScrapingService {
  constructor(
    private readonly crawler: NestCrawlerService,
    private readonly prisma: PrismaService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

  formetData = (data: SData): CreateScraping[] => {
    let title: string[] = [];
    let content: string[] = [];
    let slug: void | string[] = [];

    const result = [];

    title = data.title
      .replace(/\r?\n|\r/g, ' ')
      .split('      ')
      .filter((e) => e);
    content = data.content.split('\n');
    slug = title.map((e: string): string => slugify(e.toLowerCase()));

    title.map(
      (e, index) => (result[index] = { ...result[index], title: e.trim() }),
    );
    content.map(
      (e, index) => (result[index] = { ...result[index], content: e.trim() }),
    );
    slug.map((e, index) => (result[index] = { ...result[index], slug: e }));

    // ? removing this will show a unrelatable value that we dont want
    result.pop();

    return result;
  };

  create(createScrapingInput: CreateScraping) {
    return 'This action adds a new scraping';
  }

  async scrape(): Promise<void> {
    const data: SData = await this.crawler.fetch({
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

    const formetedData: CreateScraping[] = this.formetData(data);

    formetedData.map(async (e): Promise<Data> => {
      const notificationExist = await this.prisma.data.findMany({
        where: {
          title: e.title,
        },
      });

      if (!notificationExist.length) {
        try {
          return await this.prisma.data.create({
            data: { title: e.title, content: e.content, slug: e.slug },
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  findAll() {
    return `This action returns all scraping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scraping`;
  }

  update(id: number, updateScrapingInput: UpdateScrapingInput) {
    return `This action updates a #${id} scraping`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraping`;
  }
}

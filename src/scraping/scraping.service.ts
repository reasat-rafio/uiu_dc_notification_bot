import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import { CreateScrapingInput } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';
import slugify from 'slugify';

interface Data {
  title: string;
  content: string;
}

interface DataWithSlugLink extends Data {
  slug: string;
}

@Injectable()
export class ScrapingService {
  constructor(private readonly crawler: NestCrawlerService) {}

  formetData = (data: Data): DataWithSlugLink[] => {
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

    title.map((e, index) => (result[index] = { ...result[index], title: e }));
    content.map(
      (e, index) => (result[index] = { ...result[index], content: e }),
    );
    slug.map((e, index) => (result[index] = { ...result[index], slug: e }));

    // ? removing this will show a unrelatable value that we dont want
    result.pop();

    return result;
  };

  create(createScrapingInput: CreateScrapingInput) {
    return 'This action adds a new scraping';
  }

  async scrape(): Promise<void> {
    const data: Data = await this.crawler.fetch({
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

    const formetedData = this.formetData(data);
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

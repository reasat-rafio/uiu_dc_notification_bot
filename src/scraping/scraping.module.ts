import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { ScrapingResolver } from './scraping.resolver';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [NestCrawlerModule],
  providers: [ScrapingResolver, ScrapingService],
})
export class ScrapingModule {}

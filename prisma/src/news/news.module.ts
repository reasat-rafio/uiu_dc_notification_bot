import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [NestCrawlerModule],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}

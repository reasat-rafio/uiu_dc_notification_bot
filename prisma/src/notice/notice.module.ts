import { NoticeResolver } from './notice.resolver';
import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [NestCrawlerModule],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}

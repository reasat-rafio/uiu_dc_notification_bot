import { DiscordConfigService } from './environment/discord-config.service';
import { NoticeResolver } from './notice.resolver';
import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { ConfigModule } from '@nestjs/config';
import { NoticeService } from './notice.service';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [
    NestCrawlerModule,
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [NoticeResolver, DiscordConfigService, NoticeService],
})
export class NoticeModule {}

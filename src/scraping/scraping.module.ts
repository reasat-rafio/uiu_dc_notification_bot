import { DiscordConfigService } from './../bot/environment/discord-config.service';
import { DiscordModule } from 'discord-nestjs';
import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { ScrapingResolver } from './scraping.resolver';
import { NestCrawlerModule } from 'nest-crawler';
import { BotHandler } from 'src/bot/bot.handler';

@Module({
  imports: [NestCrawlerModule],
  providers: [ScrapingResolver, ScrapingService],
})
export class ScrapingModule {}

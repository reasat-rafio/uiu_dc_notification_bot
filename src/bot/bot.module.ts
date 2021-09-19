import { DiscordConfigService } from './environment/discord-config.service';
import { BotHandler } from './bot.resolver';
import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [
    NestCrawlerModule,
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [BotHandler, DiscordConfigService, BotService],
})
export class BotModule {}

import { DiscordConfigService } from './environment/discord-config.service';
import { BotHandler } from './bot.handler';
import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [BotHandler, DiscordConfigService, BotService],
})
export class BotModule {}

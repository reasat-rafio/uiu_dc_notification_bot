import { BotModule } from '../bot/bot.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

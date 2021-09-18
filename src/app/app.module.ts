import { PrismaModule } from './../prisma/prisma.module';
import { ScrapingModule } from './../scraping/scraping.module';
import { BotModule } from '../bot/bot.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    BotModule,
    PrismaModule,
    ScrapingModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { PrismaModule } from './../prisma/prisma.module';
import { NoticeModule } from '../notice/notice.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscordConfigModule } from '../discord/discord.module';
import { DiscordModule } from 'discord-nestjs';
import { ConfigModule } from '@nestjs/config';
import { DiscordConfigService } from '../discord/discord.service';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [
    NewsModule,
    NoticeModule,
    PrismaModule,
    DiscordConfigModule,
    ScheduleModule.forRoot(),
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

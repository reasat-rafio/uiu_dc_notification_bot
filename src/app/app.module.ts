import { PrismaModule } from './../prisma/prisma.module';
import { NoticeModule } from '../notice/notice.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NoticeModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

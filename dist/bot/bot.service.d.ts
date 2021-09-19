import { Data } from '.prisma/client';
import { MessageEmbed } from 'discord.js';
import { NestCrawlerService } from 'nest-crawler';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscordClientProvider } from 'discord-nestjs';
import { CreateScraping } from './dto/create-scraping.input';
interface SData {
    title: string;
    content: string;
}
export declare class BotService {
    private readonly crawler;
    private readonly prisma;
    constructor(crawler: NestCrawlerService, prisma: PrismaService);
    discordProvider: DiscordClientProvider;
    formetData: (data: SData) => CreateScraping[];
    checkMany(messages: Data[]): MessageEmbed[];
    check(messages: Data): MessageEmbed;
    scrape(): Promise<void>;
}
export {};

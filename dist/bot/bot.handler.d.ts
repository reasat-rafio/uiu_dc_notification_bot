import { PrismaService } from './../prisma/prisma.service';
import { ClientProvider } from 'discord-nestjs';
import { Message } from 'discord.js';
import { BotService } from './bot.service';
export declare class BotHandler {
    private readonly prisma;
    private readonly botservice;
    private readonly logger;
    constructor(prisma: PrismaService, botservice: BotService);
    discordProvider: ClientProvider;
    start(): void;
    scrapeAll(): Promise<void>;
    recentNotification(message: Message): Promise<void>;
    last5Notification(message: Message): Promise<void>;
    last10Notification(message: Message): Promise<void>;
}

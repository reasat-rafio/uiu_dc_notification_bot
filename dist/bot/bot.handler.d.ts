import { PrismaService } from './../prisma/prisma.service';
import { DiscordClientProvider } from 'discord-nestjs';
import { Message } from 'discord.js';
import { BotService } from './bot.service';
export declare class BotHandler {
    private readonly discordProvider;
    private readonly prisma;
    private readonly botservice;
    private readonly logger;
    constructor(discordProvider: DiscordClientProvider, prisma: PrismaService, botservice: BotService);
    onReady(): void;
    recentNotification(message: Message): Promise<void>;
    razibRoast(message: Message): Promise<void>;
    last5Notification(message: Message): Promise<void>;
    last10Notification(message: Message): Promise<void>;
}

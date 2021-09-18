import { DiscordClientProvider } from 'discord-nestjs';
import { Message } from 'discord.js';
export declare class BotHandler {
    private readonly discordProvider;
    private readonly logger;
    constructor(discordProvider: DiscordClientProvider);
    onReady(): void;
    recentNotification(message: Message): Promise<void>;
    razibRoast(message: Message): Promise<void>;
    last5Notification(message: Message): Promise<void>;
    last10Notification(message: Message): Promise<void>;
}

import { BotService } from './bot.service';
import { Message } from 'discord.js';
export declare class BotHandler {
    private readonly botService;
    private savedNotifications;
    constructor(botService: BotService);
    onMessage(message: Message): Promise<void>;
    onMessageUpdate(oldMessage: Message, newMessage: Message): Promise<void>;
    onMessageDelete(deletedMessage: Message): Promise<void>;
}

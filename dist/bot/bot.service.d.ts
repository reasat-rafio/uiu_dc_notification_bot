import { Data } from '.prisma/client';
import { MessageEmbed } from 'discord.js';
export declare class BotService {
    check(messages: Data[]): MessageEmbed[];
}

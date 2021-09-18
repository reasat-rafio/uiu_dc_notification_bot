import { Injectable, Logger } from '@nestjs/common';
import { On, DiscordClientProvider, Once, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';

@Injectable()
export class BotHandler {
  private readonly logger = new Logger(BotHandler.name);
  constructor(private readonly discordProvider: DiscordClientProvider) {}
  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }

  @OnCommand({ name: 'recent' })
  async recentNotification(message: Message): Promise<void> {
    await message.reply(`Returning you the recent notification`);
  }

  @OnCommand({ name: 'last5' })
  async last5Notification(message: Message): Promise<void> {
    await message.reply(`Returning you the last5 notification`);
  }

  @OnCommand({ name: 'last10' })
  async last10Notification(message: Message): Promise<void> {
    await message.reply(`Returning you the last10 notification`);
  }
}

import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { DiscordClientProvider, Once, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import config from '../config';
import { BotService } from './bot.service';
const { defaultEmbed, alexWhitelist, preventWords } = config;

@Injectable()
export class BotHandler {
  private readonly logger = new Logger(BotHandler.name);
  constructor(
    private readonly discordProvider: DiscordClientProvider,
    private readonly prisma: PrismaService,
    private readonly botservice: BotService,
  ) {}
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

  @OnCommand({ name: 'gethim' })
  async razibRoast(message: Message): Promise<void> {
    await message.reply(
      `Rajib bhai khay luchi, @Realest#1696 er mukhe @Dank Memer#5192 er bichi`,
    );
  }

  @OnCommand({ name: 'last5' })
  async last5Notification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const data = await this.prisma.data.findMany({ take: 5 });
    const embdData = this.botservice.check(data);
    embdData.map(async (e) => await message.channel.send(e));
  }

  @OnCommand({ name: 'last10' })
  async last10Notification(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    }
    const data = await this.prisma.data.findMany({ take: 10 });
    const embdData = this.botservice.check(data);
    embdData.map(async (e) => await message.channel.send(e));
  }
}

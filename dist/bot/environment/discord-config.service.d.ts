import { ConfigService } from '@nestjs/config';
import { DiscordModuleOption, DiscordOptionsFactory } from 'discord-nestjs';
export declare class DiscordConfigService implements DiscordOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createDiscordOptions(): DiscordModuleOption;
}

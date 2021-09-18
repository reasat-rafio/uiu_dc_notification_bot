"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const discord_config_service_1 = require("./environment/discord-config.service");
const bot_handler_1 = require("./bot.handler");
const common_1 = require("@nestjs/common");
const discord_nestjs_1 = require("discord-nestjs");
const config_1 = require("@nestjs/config");
const bot_service_1 = require("./bot.service");
let BotModule = class BotModule {
};
BotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            discord_nestjs_1.DiscordModule.forRootAsync({ useClass: discord_config_service_1.DiscordConfigService }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        providers: [bot_handler_1.BotHandler, discord_config_service_1.DiscordConfigService, bot_service_1.BotService],
    })
], BotModule);
exports.BotModule = BotModule;
//# sourceMappingURL=bot.module.js.map
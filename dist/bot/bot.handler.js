"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BotHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotHandler = void 0;
const common_1 = require("@nestjs/common");
const discord_nestjs_1 = require("discord-nestjs");
const discord_js_1 = require("discord.js");
let BotHandler = BotHandler_1 = class BotHandler {
    constructor(discordProvider) {
        this.discordProvider = discordProvider;
        this.logger = new common_1.Logger(BotHandler_1.name);
    }
    onReady() {
        this.logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`);
    }
    async recentNotification(message) {
        await message.reply(`Returning you the recent notification`);
    }
    async razibRoast(message) {
        await message.reply(`Rajib bhai khay luchi, @Realest#1696 er mukhe @Dank Memer#5192 er bichi`);
    }
    async last5Notification(message) {
        await message.reply(`Returning you the last5 notification`);
    }
    async last10Notification(message) {
        await message.reply(`Returning you the last10 notification`);
    }
};
__decorate([
    (0, discord_nestjs_1.Once)({ event: 'ready' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotHandler.prototype, "onReady", null);
__decorate([
    (0, discord_nestjs_1.OnCommand)({ name: 'recent' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "recentNotification", null);
__decorate([
    (0, discord_nestjs_1.OnCommand)({ name: 'gethim' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "razibRoast", null);
__decorate([
    (0, discord_nestjs_1.OnCommand)({ name: 'last5' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "last5Notification", null);
__decorate([
    (0, discord_nestjs_1.OnCommand)({ name: 'last10' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "last10Notification", null);
BotHandler = BotHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [discord_nestjs_1.DiscordClientProvider])
], BotHandler);
exports.BotHandler = BotHandler;
//# sourceMappingURL=bot.handler.js.map
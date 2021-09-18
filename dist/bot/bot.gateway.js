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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotHandler = void 0;
const bot_service_1 = require("./bot.service");
const common_1 = require("@nestjs/common");
const discord_nestjs_1 = require("discord-nestjs");
const discord_js_1 = require("discord.js");
let BotHandler = class BotHandler {
    constructor(botService) {
        this.botService = botService;
        this.savedNotifications = [];
    }
    async onMessage(message) {
        if (message.author.bot) {
            return;
        }
        const notifications = this.botService.check(message);
        if (notifications.length) {
            const sent = await message.channel.send(notifications[0]);
            this.savedNotifications.push({
                messageId: message.id,
                channelId: message.channel.id,
                notificationId: sent.id,
            });
        }
        return;
    }
    async onMessageUpdate(oldMessage, newMessage) {
        if (newMessage.author.bot) {
            return;
        }
        const notifications = this.botService.check(newMessage);
        const targetNotification = this.savedNotifications.find((el) => el.messageId === newMessage.id &&
            el.channelId === newMessage.channel.id);
        if (!targetNotification && notifications.length) {
            const sent = await newMessage.channel.send(notifications[0]);
            this.savedNotifications.push({
                messageId: newMessage.id,
                channelId: newMessage.channel.id,
                notificationId: sent.id,
            });
            return;
        }
        if (targetNotification && !notifications.length) {
            const notificationMessage = await newMessage.channel.messages.fetch(targetNotification.notificationId);
            if (notificationMessage && notificationMessage.deletable) {
                try {
                    await notificationMessage.delete();
                }
                catch (error) {
                    console.error(error);
                }
                this.savedNotifications = this.savedNotifications.filter((el) => el.messageId !== newMessage.id ||
                    el.channelId !== newMessage.channel.id);
                return;
            }
        }
        if (targetNotification && notifications.length) {
            const notificationMessage = await newMessage.channel.messages.fetch(targetNotification.notificationId);
            if (notificationMessage) {
                await notificationMessage.edit(notifications[0]);
                return;
            }
        }
        return;
    }
    async onMessageDelete(deletedMessage) {
        const deletedNotification = this.savedNotifications.find((message) => message.messageId === deletedMessage.id &&
            message.channelId === deletedMessage.channel.id);
        if (deletedNotification) {
            this.savedNotifications = this.savedNotifications.filter((notification) => notification.channelId !== deletedNotification.channelId &&
                notification.messageId !== deletedNotification.messageId);
            const notificationMessage = await deletedMessage.channel.messages.fetch(deletedNotification.notificationId);
            if (notificationMessage && notificationMessage.deletable) {
                try {
                    await notificationMessage.delete();
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        return;
    }
};
__decorate([
    (0, discord_nestjs_1.On)({ event: 'message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "onMessage", null);
__decorate([
    (0, discord_nestjs_1.On)({ event: 'messageUpdate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message, discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "onMessageUpdate", null);
__decorate([
    (0, discord_nestjs_1.On)({ event: 'messageDelete' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], BotHandler.prototype, "onMessageDelete", null);
BotHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotHandler);
exports.BotHandler = BotHandler;
//# sourceMappingURL=bot.gateway.js.map
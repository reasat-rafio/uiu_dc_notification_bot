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
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const slugify_1 = require("slugify");
const nest_crawler_1 = require("nest-crawler");
const prisma_service_1 = require("../prisma/prisma.service");
const discord_nestjs_1 = require("discord-nestjs");
const { defaultEmbed } = config_1.default;
let BotService = class BotService {
    constructor(crawler, prisma) {
        this.crawler = crawler;
        this.prisma = prisma;
        this.formetData = (data) => {
            let title = [];
            let content = [];
            let slug = [];
            const result = [];
            title = data.title
                .replace(/\r?\n|\r/g, ' ')
                .split('      ')
                .filter((e) => e);
            content = data.content.split('\n');
            slug = title.map((e) => (0, slugify_1.default)(e.toLowerCase()));
            title.map((e, index) => (result[index] = Object.assign(Object.assign({}, result[index]), { title: e.trim() })));
            content.map((e, index) => (result[index] = Object.assign(Object.assign({}, result[index]), { content: e.trim() })));
            slug.map((e, index) => (result[index] = Object.assign(Object.assign({}, result[index]), { slug: e })));
            result.pop();
            return result;
        };
    }
    checkMany(messages) {
        const embed = messages.map((d) => defaultEmbed(config_1.default.colors.alerts)
            .setTitle(d.title)
            .setDescription(d.content)
            .setTimestamp(d.createdDate)
            .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
            .setAuthor('United International University', process.env.IMG_URL));
        return embed;
    }
    check(messages) {
        const embed = defaultEmbed(config_1.default.colors.alerts)
            .setTitle(messages.title)
            .setDescription(messages.content)
            .setTimestamp(messages.createdDate)
            .setURL(`https://www.uiu.ac.bd/notices/${messages.slug}`)
            .setAuthor('United International University', process.env.IMG_URL);
        return embed;
    }
    async scrape() {
        const data = await this.crawler.fetch({
            target: 'https://www.uiu.ac.bd/notices',
            fetch: {
                title: {
                    selector: '.entry-header',
                },
                content: {
                    selector: '.event-list-excerpt',
                },
            },
        });
        const formetedData = this.formetData(data);
        formetedData.map(async (data) => {
            const notificationExist = await this.prisma.data.findMany({
                where: {
                    title: data.title,
                },
            });
            if (!notificationExist.length) {
                try {
                    const newNotifications = await this.prisma.data.create({
                        data: { title: data.title, content: data.content, slug: data.slug },
                    });
                    this.discordProvider.getClient().guilds.cache.each(async (guild) => {
                        try {
                            const channels = guild.channels.cache
                                .filter((channel) => {
                                return (channel.type === 'text' &&
                                    channel
                                        .permissionsFor(guild.me)
                                        .has(['VIEW_CHANNEL', 'SEND_MESSAGES']));
                            })
                                .find((c) => c.name === 'general' || c.position === 0);
                            if (channels) {
                                const embdData = this.check(newNotifications);
                                await channels.send(embdData);
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                    return newNotifications;
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
};
__decorate([
    (0, discord_nestjs_1.Client)(),
    __metadata("design:type", discord_nestjs_1.DiscordClientProvider)
], BotService.prototype, "discordProvider", void 0);
BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nest_crawler_1.NestCrawlerService,
        prisma_service_1.PrismaService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map
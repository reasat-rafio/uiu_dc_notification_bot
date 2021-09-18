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
exports.ScrapingService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const nest_crawler_1 = require("nest-crawler");
const slugify_1 = require("slugify");
let ScrapingService = class ScrapingService {
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
    create(createScrapingInput) {
        return 'This action adds a new scraping';
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
        formetedData.map(async (e) => {
            const notificationExist = await this.prisma.data.findMany({
                where: {
                    title: e.title,
                },
            });
            if (!notificationExist.length) {
                try {
                    return await this.prisma.data.create({
                        data: { title: e.title, content: e.content, slug: e.slug },
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
    findAll() {
        return `This action returns all scraping`;
    }
    findOne(id) {
        return `This action returns a #${id} scraping`;
    }
    update(id, updateScrapingInput) {
        return `This action updates a #${id} scraping`;
    }
    remove(id) {
        return `This action removes a #${id} scraping`;
    }
};
ScrapingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nest_crawler_1.NestCrawlerService,
        prisma_service_1.PrismaService])
], ScrapingService);
exports.ScrapingService = ScrapingService;
//# sourceMappingURL=scraping.service.js.map
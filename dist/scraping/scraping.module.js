"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingModule = void 0;
const common_1 = require("@nestjs/common");
const scraping_service_1 = require("./scraping.service");
const scraping_resolver_1 = require("./scraping.resolver");
const nest_crawler_1 = require("nest-crawler");
const bot_resolver_1 = require("../bot/bot.resolver");
let ScrapingModule = class ScrapingModule {
};
ScrapingModule = __decorate([
    (0, common_1.Module)({
        imports: [nest_crawler_1.NestCrawlerModule],
        providers: [scraping_resolver_1.ScrapingResolver, scraping_service_1.ScrapingService],
    })
], ScrapingModule);
exports.ScrapingModule = ScrapingModule;
//# sourceMappingURL=scraping.module.js.map
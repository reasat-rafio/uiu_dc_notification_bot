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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const scraping_service_1 = require("./scraping.service");
const create_scraping_input_1 = require("./dto/create-scraping.input");
const update_scraping_input_1 = require("./dto/update-scraping.input");
let ScrapingResolver = class ScrapingResolver {
    constructor(scrapingService) {
        this.scrapingService = scrapingService;
    }
    create(createScrapingInput) {
        return this.scrapingService.create(createScrapingInput);
    }
    findAll() {
        return this.scrapingService.findAll();
    }
    scrapeAll() {
        return this.scrapingService.scrape();
    }
    update(updateScrapingInput) {
        return this.scrapingService.update(updateScrapingInput.id, updateScrapingInput);
    }
    remove(id) {
        return this.scrapingService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createScraping'),
    __param(0, (0, graphql_1.Args)('createScrapingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scraping_input_1.CreateScraping]),
    __metadata("design:returntype", void 0)
], ScrapingResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('scraping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScrapingResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)('scrape'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScrapingResolver.prototype, "scrapeAll", null);
__decorate([
    (0, graphql_1.Mutation)('updateScraping'),
    __param(0, (0, graphql_1.Args)('updateScrapingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_scraping_input_1.UpdateScrapingInput]),
    __metadata("design:returntype", void 0)
], ScrapingResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('removeScraping'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ScrapingResolver.prototype, "remove", null);
ScrapingResolver = __decorate([
    (0, graphql_1.Resolver)('Scraping'),
    __metadata("design:paramtypes", [scraping_service_1.ScrapingService])
], ScrapingResolver);
exports.ScrapingResolver = ScrapingResolver;
//# sourceMappingURL=scraping.resolver.js.map
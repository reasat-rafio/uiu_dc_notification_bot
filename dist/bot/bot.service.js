"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const { defaultEmbed, alexWhitelist, preventWords } = config_1.default;
let BotService = class BotService {
    check(messages) {
        const embed = messages.map((d) => defaultEmbed(config_1.default.colors.alerts)
            .setTitle(d.title)
            .setDescription(d.content)
            .setTimestamp(d.createdDate)
            .setURL(`https://www.uiu.ac.bd/notices/${d.slug}`)
            .setAuthor('UIU', process.env.IMG_URL));
        return embed;
    }
};
BotService = __decorate([
    (0, common_1.Injectable)()
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map
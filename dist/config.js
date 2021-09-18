"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    preventWords: [
        'guyz',
        'guyzz',
        'bruh',
        'duude',
        'women',
        'sir',
        'sirr',
        'man',
        'fellas',
        'madam',
        'maam',
        "ma'am",
        'yessir',
        'chad',
        'simp',
        'mate',
    ],
    allowedWords: ['fellow'],
    alexWhitelist: {
        profanitySureness: 1,
        noBinary: true,
        allow: [
            'add',
            'basically',
            'clearly',
            'dad-mom',
            'daft',
            'fellow',
            'fellowship',
            'gimp',
            'hero-heroine',
            'host-hostess',
            'hostesses-hosts',
            'husband-wife',
            'jesus',
            'king',
            'kushi',
            'latino',
            'long-time-no-see',
            'master',
            'moan',
            'moaning',
            'obvious',
            'of-course',
            'postman-postwoman',
            'special',
            'superman-superwoman',
            'simple',
            'just',
        ],
    },
    defaultEmbed: (color = '#0099ff') => {
        return new discord_js_1.MessageEmbed().setColor(color).setFooter('');
    },
    colors: {
        message: '#0099ff',
        alerts: '#e84118',
        system: '#4cd137',
        github: '#6f7c7d',
        users: '#ffc200',
        help: '#4b2c5e',
    },
};
//# sourceMappingURL=config.js.map
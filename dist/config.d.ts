import { MessageEmbed } from 'discord.js';
declare const _default: {
    preventWords: string[];
    allowedWords: string[];
    alexWhitelist: {
        profanitySureness: number;
        noBinary: boolean;
        allow: string[];
    };
    defaultEmbed: (color?: string) => MessageEmbed;
    colors: {
        message: string;
        alerts: string;
        system: string;
        github: string;
        users: string;
        help: string;
    };
};
export default _default;

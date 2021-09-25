import { MessageEmbed } from 'discord.js';

export default {
  // words we block in addition to AlexJS
  // please check words are not already covered by AlexJS and the libraries it uses first
  // http://alexjs.com
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
  // words we allow even if AlexJS blocks (words are sometimes grouped by we want to be more granular)
  allowedWords: ['fellow'],
  alexWhitelist: {
    profanitySureness: 1,
    noBinary: true,
    // AlexJS to ignore these grouped words https://github.com/retextjs/retext-equality/blob/main/rules.md
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

  defaultEmbed: (color = '#f68920') => {
    return new MessageEmbed().setColor(color).setFooter('');
  },
  colors: {
    message: '#0099ff',
    alerts: '#f68920',
    system: '#4cd137',
    github: '#6f7c7d',
    users: '#ffc200',
    help: '#4b2c5e',
    error: '#cc0000',
  },

  thumbnails: {
    notValidCommand:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632505875/uiu_discord/mirage-delete_u5tke7.png',

    outOfDBLimit:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632505019/uiu_discord/flamenco-no-messages-1_ydq77g.png',
  },

  images: {
    event:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508241/uiu_discord/doodle-137_iqpvbd.png',
    notice:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507901/uiu_discord/doodle-45_nyrncx.png',
    news: 'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508266/uiu_discord/doodle-131_xbsahu.pngs',
  },
};

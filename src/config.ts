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
  },

  thumbnails: {
    notValidCommand:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632505875/uiu_discord/mirage-delete_u5tke7.png',

    outOfDBLimit:
      'https://res.cloudinary.com/dapjxqk64/image/upload/v1632505019/uiu_discord/flamenco-no-messages-1_ydq77g.png',
  },

  images: [
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632505617/uiu_discord/doodle-16_ysirqc.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507273/uiu_discord/doodle-01_jlpbek.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507580/uiu_discord/doodle-04_m3yel7.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507607/uiu_discord/doodle-06_rarkls.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507628/uiu_discord/doodle-11_jrqept.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507645/uiu_discord/doodle-12_dme4zv.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507666/uiu_discord/doodle-17_sevzta.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507677/uiu_discord/doodle-18_cscvwt.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507689/uiu_discord/doodle-19_xjwpye.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507700/uiu_discord/doodle-21_gtnjfv.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507710/uiu_discord/doodle-22_y4fkq0.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507742/uiu_discord/doodle-23_ndm6q0.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507764/uiu_discord/doodle-24_ytkcw8.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507787/uiu_discord/doodle-37_suq2gi.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507812/uiu_discord/doodle-45_du3obw.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507839/uiu_discord/doodle-57_aavts1.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507855/uiu_discord/doodle-59_wnuiq6.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507877/uiu_discord/doodle-69_i8cfyu.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507888/uiu_discord/doodle-58_fne7rn.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507901/uiu_discord/doodle-45_nyrncx.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507934/uiu_discord/doodle-82_pqmzmg.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507945/uiu_discord/doodle-83_zvyazn.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507960/uiu_discord/doodle-77_lpy3sz.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507975/uiu_discord/doodle-84_k7n91t.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507987/uiu_discord/doodle-85_gk85o7.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632507997/uiu_discord/doodle-90_ziour7.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508010/uiu_discord/doodle-93_t6kbo7.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508025/uiu_discord/doodle-95_c8rezs.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508120/uiu_discord/doodle-97_tocz2c.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508142/uiu_discord/doodle-107_tiwkx4.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508157/uiu_discord/doodle-108_aizriw.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508191/uiu_discord/doodle-115_k9fnyp.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508241/uiu_discord/doodle-137_iqpvbd.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508253/uiu_discord/doodle-136_oatu7h.png',
    'https://res.cloudinary.com/dapjxqk64/image/upload/v1632508266/uiu_discord/doodle-131_xbsahu.png',
  ],
};

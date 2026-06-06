const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const replacements = [
  // 1. Grande Centre Point Hotel Terminal 21 (Agoda/Klook -> Trip.com)
  {
    from: 'https://www.klook.com/zh-TW/hotels/detail/210404-grande-centre-point-hotel-terminal-21/',
    to: 'https://tw.trip.com/hotels/bangkok-hotel-detail-687895/grande-centre-point-hotel-terminal-21/'
  },

  // 2. ICONSIAM (Wikipedia -> Trip.com)
  {
    from: 'https://zh.wikipedia.org/wiki/ICONSIAM',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/iconsiam-50853765/'
  },

  // 3. Damnoen Saduak (Wikipedia -> Trip.com)
  {
    from: 'https://zh.wikipedia.org/wiki/%E4%B8%B9%E8%83%BD%E6%B2%99%E5%A4%9A%E6%B0%B4%E4%B8%8A%E5%B8%82%E5%A0%B4',
    to: 'https://tw.trip.com/travel-guide/attraction/damnoen-saduak/damnoen-saduak-floating-market-81878/'
  },

  // 4. Maeklong (Wikipedia -> Trip.com)
  {
    from: 'https://zh.wikipedia.org/wiki/%E7%BE%8E%E5%8A%9F%E9%90%B5%E8%B7%AF%E5%B8%82%E5%A0%B4',
    to: 'https://tw.trip.com/travel-guide/attraction/samut-songkhram/maeklong-railway-market-10531631/'
  },

  // 5. Cross Pattaya (Agoda/Klook -> Trip.com Hotel Page)
  {
    from: 'https://www.agoda.com/zh-tw/cross-pattaya-oceanphere_2/hotel/pattaya-th.html',
    to: 'https://tw.trip.com/hotels/pattaya-hotel-detail-38064971/cross-pattaya-oceanphere/'
  },

  // 6. Kliff Beach Club (Viviyu Blog -> Trip.com Restaurant Page)
  {
    from: 'https://www.viviyu.com/archives/35904/',
    to: 'https://tw.trip.com/travel-guide/restaurant/pattaya/kliff-beach-club-117865239/'
  },

  // 7. Suphattra Land (Viviyu Blog -> Trip.com Attraction Page)
  {
    from: 'https://www.viviyu.com/archives/33941/',
    to: 'https://tw.trip.com/travel-guide/attraction/rayong/suphattra-land-10531557/'
  },

  // 8. Pa Dee Rayong (Viviyu Blog -> Trip.com Attraction Page)
  {
    from: 'https://www.viviyu.com/archives/33945/',
    to: 'https://tw.trip.com/travel-guide/attraction/rayong/padee-55694248/'
  },

  // 9. One Bangkok (Website -> Trip.com Attraction Page)
  {
    from: 'https://www.onebangkok.com/',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/one-bangkok-145070275/'
  },

  // 10. Safari World (Website/Klook -> Trip.com)
  {
    from: 'https://www.safariworld.com/',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/safari-world-75615/'
  },

  // 11. Platinum Mall (TripAdvisor -> Trip.com)
  {
    from: 'https://www.tripadvisor.com.tw/Attraction_Review-g293916-d621306-Reviews-The_Platinum_Fashion_Mall-Bangkok.html',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/the-platinum-fashion-mall-10531653/'
  },

  // 12. Savoey (Website/Klook -> Trip.com)
  {
    from: 'https://www.savoey.com/',
    to: 'https://tw.trip.com/travel-guide/restaurant/bangkok/savoey-seafood-co-terminal-21-asok-100234151/'
  },

  // 13. FO SHO BRO (Wendy\'s Blog -> Trip.com)
  {
    from: 'https://www.wendyjourney.com/fo-sho-bro/',
    to: 'https://tw.trip.com/travel-guide/restaurant/bangkok/fo-sho-bro-135894178/'
  },

  // 14. Chao Phraya River Cruise (Wikipedia -> Trip.com)
  {
    from: 'https://zh.wikipedia.org/wiki/%E6%98%AD%E6%8A%AB%E8%80%B6%E6%B2%B3',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/chao-phraya-river-75574/'
  },

  // 15. Columbia Pictures Aquaverse (Website -> Trip.com)
  {
    from: 'https://columbiapicturesaquaverse.com/',
    to: 'https://tw.trip.com/travel-guide/attraction/pattaya/columbia-pictures-aquaverse-135967005/'
  },

  // 16. Big C (Wikipedia -> Trip.com)
  {
    from: 'https://zh.wikipedia.org/wiki/Big_C',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/big-c-ratchadamri-10531688/'
  },

  // 17. Let's Relax (Website -> Trip.com)
  {
    from: 'https://letsrelaxspa.com/',
    to: 'https://tw.trip.com/travel-guide/attraction/bangkok/lets-relax-terminal-21-55705351/'
  }
];

let replacedCount = 0;
for (const replacement of replacements) {
  const escapedFrom = replacement.from.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedFrom, 'g');
  const occurrences = (content.match(regex) || []).length;
  if (occurrences > 0) {
    content = content.replace(regex, replacement.to);
    console.log(`Replaced: ${replacement.from} -> ${replacement.to} (${occurrences} occurrences)`);
    replacedCount += occurrences;
  }
}

if (replacedCount > 0) {
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Successfully completed all updates! Total replacements: ${replacedCount}`);
} else {
  console.log('No matches found. No changes made.');
}

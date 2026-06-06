const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const replacements = [
  // 1. Grande Centre Point Hotel Terminal 21
  {
    from: 'https://www.klook.com/zh-TW/hotels/detail/210404-grande-centre-point-hotel-terminal-21/',
    to: 'https://www.agoda.com/zh-tw/grande-centre-point-hotel-terminal-21/hotel/bangkok-th.html'
  },

  // 2. ICONSIAM
  {
    from: 'https://www.klook.com/zh-TW/blog/iconsiam-bangkok/',
    to: 'https://zh.wikipedia.org/wiki/ICONSIAM'
  },

  // 3. Damnoen Saduak Floating Market (水上市場)
  {
    from: 'https://www.klook.com/zh-TW/blog/bangkok-floating-markets/',
    to: 'https://zh.wikipedia.org/wiki/%E4%B8%B9%E8%83%BD%E6%B2%99%E5%A4%9A%E6%B0%B4%E4%B8%8A%E5%B8%82%E5%A0%B4'
  },

  // 4. Maeklong Railway Market (美功鐵道市場)
  {
    from: 'https://www.klook.com/zh-TW/blog/maeklong-railway-market-bangkok/',
    to: 'https://zh.wikipedia.org/wiki/%E7%BE%8E%E5%8A%9F%E9%90%B5%E8%B7%AF%E5%B8%82%E5%A0%B4'
  },

  // 5. Kliff Beach Club
  {
    from: 'https://www.google.com/maps/place/Kliff+Beach+Club+Pattaya',
    to: 'https://www.facebook.com/kliffbeachclub/'
  },

  // 6. Suphattra Land Orchard
  {
    from: 'https://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/',
    to: 'https://www.facebook.com/suphattraland/'
  },

  // 7. Pa Dee Rayong Cafe
  {
    from: 'https://www.google.com/maps/place/Pa+Dee+Rayong',
    to: 'https://www.facebook.com/Padeecafecoffeeshop/'
  },

  // 8. Safari World Bangkok
  {
    from: 'https://www.klook.com/zh-TW/blog/safari-world-bangkok/',
    to: 'https://www.safariworld.com/'
  },

  // 9. Savoey Seafood Restaurant
  {
    from: 'https://www.klook.com/zh-TW/activity/9880-savoey-seafood-co-bangkok/',
    to: 'https://www.savoey.com/'
  },

  // 10. FO SHO BRO Cafe
  {
    from: 'https://www.wendyjourney.com/fo-sho-bro/',
    to: 'https://www.facebook.com/foshobro.bkk/'
  },

  // 11. Big C Supercenter
  {
    from: 'https://www.klook.com/zh-TW/blog/bangkok-big-c-supercenter/',
    to: 'https://zh.wikipedia.org/wiki/Big_C'
  },

  // 12. Let's Relax Spa
  {
    from: 'https://www.klook.com/zh-TW/activity/1659-lets-relax-spa-treatments-bangkok/',
    to: 'https://letsrelaxspa.com/'
  },

  // 13. Columbia Pictures Aquaverse
  {
    from: 'https://www.klook.com/zh-TW/activity/71542-columbia-pictures-aquaverse-water-park-ticket-pattaya/',
    to: 'https://columbiapicturesaquaverse.com/'
  },

  // 14. Chao Phraya River Cruise
  {
    from: 'https://www.klook.com/zh-TW/blog/chao-phraya-river-cruises-bangkok/',
    to: 'https://zh.wikipedia.org/wiki/%E6%98%AD%E6%8A%AB%E8%80%B6%E6%B2%B3'
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

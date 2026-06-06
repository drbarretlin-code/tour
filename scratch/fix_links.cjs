const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const replacements = [
  // 1. Kliff Beach Club (Website -> Viviyu Blog)
  {
    from: 'https://www.kliffbeachclub.com/',
    to: 'https://www.viviyu.com/archives/35904/'
  },

  // 2. Suphattra Land (TripAdvisor -> Viviyu Blog)
  {
    from: 'https://www.tripadvisor.com.tw/Attraction_Review-g2237829-d2001550-Reviews-Supatra_Land_Orchard-Ban_Khai_Rayong_Province.html',
    to: 'https://www.viviyu.com/archives/33941/'
  },

  // 3. Pa Dee Rayong (TripAdvisor -> Viviyu Blog)
  {
    from: 'https://www.tripadvisor.com.tw/Restaurant_Review-g2237827-d13801267-Reviews-Pa_Dee-Rayong_Rayong_Province.html',
    to: 'https://www.viviyu.com/archives/33945/'
  },

  // 4. FO SHO BRO (TripAdvisor -> Wendy\'s Journey Blog)
  {
    from: 'https://www.tripadvisor.com.tw/Restaurant_Review-g293916-d25101037-Reviews-Fo_Sho_Bro-Bangkok.html',
    to: 'https://www.wendyjourney.com/fo-sho-bro/'
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

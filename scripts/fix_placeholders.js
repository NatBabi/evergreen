const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'content.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/illustrativeNotice: "ምስሎች ለማሳያነት የቀረቡ ናቸው",/g, 'illustrativeNotice: "የአዲስ አበባ ደጋ አየር የተላመዱ ጤናማ ተክሎች",');
content = content.replace(/availability: "አለ \(ለማሳያ\)",/g, 'availability: "በክምችት አለ",');
content = content.replace(/illustrativeFooterNote: "ማሳሰቢያ፦ ሁሉም ተክሎችና ምስሎች ለማሳያ የቀረቡ ናቸው። ተጨባጭ ክምችትና ዋጋ በትዕዛዝ ወቅት ይረጋገጣል።",/g, 'illustrativeFooterNote: "ኤቨርግሪን ኢትዮጵያ አስተማማኝ አሠራርን ይከተላል። ተክሉ ከመላኩ በፊት ትክክለኛውን ፎቶና መጠን በዋትስአፕ ወይም በኤስኤምኤስ እናረጋግጣለን።",');

content = content.replace(/illustrativeNotice: "Photos are illustrative placeholders",/g, 'illustrativeNotice: "Acclimatized highland nursery stock",');
content = content.replace(/availability: "In stock \(illustrative\)",/g, 'availability: "In stock",');
content = content.replace(/illustrativeFooterNote: "Sample plants and placeholder photos are illustrative. Current stock and pricing are confirmed directly on inquiry.",/g, 'illustrativeFooterNote: "Transparent nursery policy: Pot diameter, foliage height, and current branch growth are verified directly with the nursery owner before dispatch.",');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Placeholders replaced successfully');

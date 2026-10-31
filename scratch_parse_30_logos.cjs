const fs = require('fs');
const raw = fs.readFileSync('scratch_thunderbolt_home.json', 'utf8');

const json = JSON.parse(raw);
// Find all components in the model
const structure = json.structure || json.data || {};
fs.writeFileSync('scratch_keys.json', JSON.stringify(Object.keys(json), null, 2), 'utf8');

// Let's search for image components with their alt/title/uri in raw text
const compRegex = /"comp-[^"]+":\{[^}]*"uri":"([^"]+)"[^}]*\}/g;
let m;
const found = [];
while ((m = compRegex.exec(raw)) !== null) {
  found.push({ snippet: m[0], uri: m[1] });
}
console.log('Found image comps with uri:', found.length);

// Let's list all 30 logo files from lines 16 to 45
const logos = [
  "9e8fea_53ab29133dc844a4a0b8f44c0125bddf~mv2.png",
  "9e8fea_4be9927098e348789415fefdc3b58604~mv2.png",
  "9e8fea_b39570d8910446b383064182331fe213~mv2.png",
  "9e8fea_17d807bac6f341efab40883df2839d05~mv2.png",
  "9e8fea_cd7a8b516b86476aab3f0359f0f7c1c3~mv2.png",
  "9e8fea_b51e781dbab84588ba6433802c909c21~mv2.png",
  "9e8fea_d89c6462f89340ee9a7ad7accd811254~mv2.png",
  "9e8fea_618ee8a9a2654ae6b1c965d9551c43a0~mv2.png",
  "9e8fea_93e1c40379424fc1a6ff60cacc673c16~mv2.png",
  "9e8fea_5ef24436c97449fa80e20c0f073282c7~mv2.png",
  "9e8fea_4451c30484b54724a5b61db6a668dd54~mv2.png",
  "9e8fea_dd0588259b5d4780804ac8e02cc933e2~mv2.png",
  "9e8fea_d462c34b93c04e659fd43b2153ed00ef~mv2.png",
  "9e8fea_39161a540da747968c38986bad02f2f7~mv2.png",
  "9e8fea_08dfb279a5874e858d6371db80a23f42~mv2.png",
  "9e8fea_00cae744d04c4636af16cce025abcbe3~mv2.png",
  "9e8fea_fdb437542ade427dbf68413489eb2243~mv2.png",
  "9e8fea_228312bed8f4473d9930669bbcec0d51~mv2.png",
  "9e8fea_4241fa4415f6428aa80dc757517c3144~mv2.png",
  "9e8fea_a6304d1b0e3d45cbaa6dd485f2546dec~mv2.png",
  "9e8fea_f3acb5bf346846d699b43cfce971eaa5~mv2.png",
  "9e8fea_01e76d74cc044fc1bade576b91ce37e6~mv2.png",
  "9e8fea_8c36be5e6b9d42f2ad2d0e6116b60e41~mv2.png",
  "9e8fea_0fe4d22affa04f33a5a5567d18e71fca~mv2.png",
  "9e8fea_26c2bcf4cace4670a69f3c6275517b41~mv2.png",
  "9e8fea_6afb918bf9e145c9ad008d1697b43e6b~mv2.png",
  "9e8fea_9bd28a25089044e6bb0ec0716d75cddb~mv2.png",
  "9e8fea_d23c5b4ad50b48d5ab12564017778508~mv2.png",
  "9e8fea_e7a2692a734743578f2e461dce25fdd1~mv2.png",
  "9e8fea_220b5205e1b8426ba5ff1dee0e737c49~mv2.png"
];

console.log('Total logos to extract:', logos.length);

// Search for each logo in raw to find its alt/title/filename
logos.forEach((logo, i) => {
  const fileKey = logo.split('~')[0];
  const idx = raw.indexOf(fileKey);
  let name = `Logo ${i+1}`;
  if (idx !== -1) {
    const nearby = raw.slice(Math.max(0, idx - 400), idx + 400);
    const altMatch = nearby.match(/"alt":"([^"]+)"|"title":"([^"]+)"|"name":"([^"]+)"/);
    if (altMatch) {
      name = altMatch[1] || altMatch[2] || altMatch[3];
    }
  }
  console.log(`${i+1}. ${name} -> ${logo}`);
});

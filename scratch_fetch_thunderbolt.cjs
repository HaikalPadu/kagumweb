const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchThunderboltModel() {
  const html = await fetchUrl('https://kagumadvance.wixsite.com/kagum-academy-4');
  const match = html.match(/https:\/\/siteassets\.parastorage\.com\/pages\/pages\/thunderbolt\?[^"'\s<>]*pageId=296508_2d520b5a3bb8fcf6467c1acac597d703_320\.json[^"'\s<>]*/);
  if (!match) {
    console.log('No home thunderbolt url found');
    return;
  }
  const url = match[0].replace(/&amp;/g, '&');
  console.log('Fetching thunderbolt JSON...');
  const raw = await fetchUrl(url);
  fs.writeFileSync('scratch_thunderbolt_home.json', raw, 'utf8');
  console.log('Saved scratch_thunderbolt_home.json, size:', raw.length);

  // Search for images, slides, media in this json
  const imgMatches = raw.match(/9e8fea_[a-zA-Z0-9~_.]+/g) || [];
  const unique = [...new Set(imgMatches)];
  console.log('Unique media in Thunderbolt model:', unique.length);
  unique.forEach((u, i) => console.log(`${i+1}: ${u}`));

  // Find components around slideshow
  const idx = raw.indexOf('comp-m3643k2s');
  console.log('comp-m3643k2s in raw json:', idx);
  if (idx !== -1) {
    fs.writeFileSync('scratch_comp_m3643k2s.json', raw.slice(idx - 100, idx + 8000), 'utf8');
    console.log('Saved scratch_comp_m3643k2s.json');
  }
}

fetchThunderboltModel().catch(console.error);

const fs = require('fs');

const https = require('https');
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function findWixDataJson() {
  const html = await fetchUrl('https://kagumadvance.wixsite.com/kagum-academy-4');
  
  // Look for siteModel or pages JSON files in Wix HTML
  const jsonUrls = html.match(/https:\/\/[^"'\s<>]+\.json[^"'\s<>]*/g) || [];
  console.log('JSON URLs found:', jsonUrls.length);
  const unique = [...new Set(jsonUrls)];
  unique.forEach((u, i) => console.log(`${i+1}: ${u}`));

  // Look for pageJsonFileName in home: 296508_2d520b5a3bb8fcf6467c1acac597d703_320
  // Wix page json is usually at:
  // https://static.parastorage.com/services/wix-thunderbolt/pages/296508_2d520b5a3bb8fcf6467c1acac597d703_320.json
  // or siteModel.siteMedia or masterPage json
  const masterPageMatch = html.match(/masterPageJsonFileName":"([^"]+)"/);
  console.log('masterPageJsonFileName:', masterPageMatch ? masterPageMatch[1] : 'not found');
  
  const siteModelMatch = html.match(/siteFeaturesConfigs":\{([\s\S]*?)\},"siteMedia/);
  if (siteModelMatch) {
    console.log('siteFeaturesConfigs found');
  }
}

findWixDataJson().catch(console.error);

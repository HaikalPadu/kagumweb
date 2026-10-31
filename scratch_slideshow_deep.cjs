const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function inspectSlideshow() {
  const html = await fetchUrl('https://kagumadvance.wixsite.com/kagum-academy-4');
  
  // Look for slideshow data or gallery data in Wix scripts
  // In Wix Thunderbolt / Classic, slideshow items often reside in masterPage or site JSON
  const matches = html.match(/"type":"Slide"[^}]*|"slides":\[[^\]]*\]|"comp-m3643k2s":\{[^}]*\}/g) || [];
  console.log('Slideshow matches:', matches.length);
  matches.forEach(m => console.log(m.slice(0, 150)));

  // Search for any other occurrences of .png or .jpg in the full html that are not yet discovered
  const allMedia = html.match(/https:\/\/static\.wixstatic\.com\/media\/[^"'\s<>]+/g) || [];
  console.log('Total media URLs in HTML:', allMedia.length);
  
  // Also look for wix image URIs formatted like wix:image://v1/
  const wixUris = html.match(/wix:image:[^"'\s<>]+/g) || [];
  console.log('wix:image URIs:', wixUris.length);

  // Search for "comp-m3643k" components
  const compRegex = /comp-m3643k[a-zA-Z0-9_]+/g;
  const comps = [...new Set(html.match(compRegex) || [])];
  console.log('Related slide components:', comps);
}

inspectSlideshow().catch(console.error);

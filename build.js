const fs = require('fs');

const key = process.env.ANTHROPIC_API_KEY;

// Print env var names that look API-related (not values — never log secrets)
const relevant = Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('API'));
console.log('Env vars found:', relevant.length ? relevant.join(', ') : '(none matching ANTHROPIC or API)');

if (!key) {
  console.error('ANTHROPIC_API_KEY is not set or empty in this build environment.');
  console.error('Go to Vercel → Project → Settings → Environment Variables and confirm');
  console.error('"ANTHROPIC_API_KEY" is checked for the Production environment.');
  // Exit 0 so the build succeeds — site will show a clear error in the UI
  process.exit(0);
}

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/__ANTHROPIC_API_KEY__/g, key);
fs.writeFileSync('index.html', html);
console.log('API key injected successfully.');

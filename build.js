const fs = require('fs');
const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error('ANTHROPIC_API_KEY env var not set'); process.exit(1); }
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/__ANTHROPIC_API_KEY__/g, key);
fs.writeFileSync('index.html', html);
console.log('API key injected.');

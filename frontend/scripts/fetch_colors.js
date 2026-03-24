const https = require('https');

https.get('https://www.simbioseventures.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const cssVars = data.match(/--[\w-]+:\s*[^;]+;/g);
    const fonts = data.match(/font-family:\s*[^;]+;/g);
    const colors = data.match(/color:\s*#[0-9a-fA-F]{3,6};/g);
    const bgColors = data.match(/background-color:\s*#[0-9a-fA-F]{3,6};/g);
    
    console.log('CSS Variables:', cssVars ? cssVars.slice(0, 20) : 'None');
    console.log('Fonts:', fonts ? [...new Set(fonts)].slice(0, 10) : 'None');
    console.log('Colors:', colors ? [...new Set(colors)].slice(0, 10) : 'None');
    console.log('Background Colors:', bgColors ? [...new Set(bgColors)].slice(0, 10) : 'None');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

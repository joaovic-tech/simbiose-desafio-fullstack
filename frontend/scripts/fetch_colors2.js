const https = require('https');

https.get('https://www.simbioseventures.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const cssLink = data.match(/href="([^"]+styles\.css[^"]*)"/);
    if (cssLink) {
      const url = new URL(cssLink[1], 'https://www.simbioseventures.com/').href;
      https.get(url, (res2) => {
        let cssData = '';
        res2.on('data', (chunk) => cssData += chunk);
        res2.on('end', () => {
          const colors = cssData.match(/#[0-9a-fA-F]{3,6}/g);
          const rgb = cssData.match(/rgba?\([^)]+\)/g);
          console.log('Colors:', colors ? [...new Set(colors)].slice(0, 20) : 'None');
          console.log('RGB:', rgb ? [...new Set(rgb)].slice(0, 20) : 'None');
        });
      });
    }
  });
});

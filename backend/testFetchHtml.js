const https = require('https');

https.get('https://sistema-inmobiliario-six.vercel.app/api/proyectos/1/plano', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const svg = json.plano.archivo_svg;
      const matches = [...svg.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
      console.log('Total IDs found:', matches.length);
      console.log('Sample IDs:', matches.slice(0, 50));
    } catch(e) {
      console.log(e, data.substring(0, 100));
    }
  });
});

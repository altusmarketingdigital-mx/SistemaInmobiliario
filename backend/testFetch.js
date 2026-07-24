const http = require('https');

http.get('https://sistemainmobiliario.vercel.app/api/proyectos/1/plano', (res) => {
  console.log('STATUS:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('BODY:', data.substring(0, 500)));
}).on('error', (e) => {
  console.error(e);
});

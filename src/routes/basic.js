module.exports = (app) => {
  app.get('/check', (req, res) => res.send('OK'));

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  });
};

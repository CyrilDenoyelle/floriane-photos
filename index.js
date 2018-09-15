const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

const walker = require('./helper/walker.js');
const imgsUrls = walker('imgs');

// console.log(imgsUrls);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { imgsUrls: imgsUrls }))
  // .get('/imgs', (req, res) => res.render('pages/index', { imgsUrls }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

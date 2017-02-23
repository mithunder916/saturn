'use strict';

const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');

const app = express();

// logging middleware
app.use(morgan('dev'));

// serve static files
app.use('/public', express.static('public'));
app.use('/samples', express.static('samples'));


// request any page and receive index.html
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, 'index.html')))

// server listening!
app.listen(3000, () => {
  console.log('Saturn is live...', 3000);
});

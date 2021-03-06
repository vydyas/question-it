require('babel-register');
require('source-map-support/register');
require('dotenv').load();

const server = require('universal-webpack/build/server');
const config = require('./config');

server({
  context: config.root,
  output: {
    path: config.buildLocation,
  },
}, config.universalWebpack);

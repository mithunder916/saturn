const karma = require('karma');

const server = new karma.Server({
  configFile: __dirname + '/karma.conf.js',
  singleRun: true
}, () => process.exit(0));

server.start();

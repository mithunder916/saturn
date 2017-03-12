
var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
global.window.AudioContext = {};
console.log("SETUP _____________________", document.defaultView.AudioContext)
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

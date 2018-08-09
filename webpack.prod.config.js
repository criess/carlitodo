const path = require('path');

console.log('NOTE: We fix a issue with loading of locals of moment.js by using this workaround: https://github.com/moment/moment/issues/1435#issuecomment-33106268');
console.log('Configure all used momentjs locals in ' + __filename );

const currentContext = __filename.split(path.sep).reverse()[0].split(".")[1];

module.exports = [
    require('./webpack/webpack-common-css')(currentContext),
    require('./webpack/webpack-common-react')(currentContext),
];


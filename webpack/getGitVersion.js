module.exports = function() {

    let rev = require('shelljs').exec('git describe --always', { silent: true }).stdout

    if ( rev === "") {
        rev = "<unknown>";
    }

    return "git rev " + rev;
}


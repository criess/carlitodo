const exec = require('shelljs').exec;

module.exports = function() {
  const GIT_DESCRIBED = exec('git describe --always', { silent: true }).stdout.split("\n")[0];
  return GIT_DESCRIBED + 
    "@" +
    exec(
      'git show ' + 
      GIT_DESCRIBED + 
      ' --date=short', 
      { silent: true }
    ).exec(
      'grep Date:', 
      { silent: true }
    ).exec(
      'cut -b 9-', 
      { silent: true }
    ).stdout.split("\n")[0];
} 

/**
 Runs npm install in the site directory.
*/

var childProcess = require('child_process');
var path = require('path');

var sitePath = path.join(__dirname, '..', 'site');

var npmCommand = 'npm' + (process.platform === 'win32' ? '.cmd' : '');
var params = ['install'];

var install = childProcess.spawn(npmCommand, params, {
  cwd: sitePath,
  env: process.env,
  stdio: 'inherit'
});

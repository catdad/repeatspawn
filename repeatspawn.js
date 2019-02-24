#!/usr/bin/env node
/* global Promise */

var join = require('command-join');
var shellton = require('shellton');

if (process.argv.length < 3) {
  console.log('repeatspawn: repeat a command until it errors');
  console.log('');
  console.log('usage:');
  console.log('  repeatspawn command with any args');
  console.log('');
  console.log('command will repeat until it errors, and will exit with the');
  console.log('same exit code as the command being repeated');
}

var command = join(process.argv.slice(2));

function exec() {
  return new Promise(function (resolve, reject) {

    shellton({
      task: command,
      stdout: 'inherit',
      stderr: 'inherit'
    }, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

function recurse(count) {
  console.log('▼ ▼ ▼ ▼ ▼ iteration %s ▼ ▼ ▼ ▼ ▼', count);

  return exec().then(function () {
    return recurse(count + 1);
  });
}

console.time('failed in');

recurse(1).catch(function (err) {
  console.timeEnd('failed in');

  console.log(err);
  process.exitCode = err.code || 1;
});

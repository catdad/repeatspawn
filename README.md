# repeatspawn

Run a CLI command repeatedly until it fails. If it never fails, it will continue running indefinitely. If it does fail, it will exit with the same error code as the command being run. I wrote this to use when debugging flaky tests, but I am sure you can use your imagination for where you can apply this.

_This is a CLI tool and cannot be used a `require` module._

```bash
npx repeatspawn mocha my-flaky-test.js
```

## Usage

```bash
repeatspawn: repeat a command until it errors

usage:
  repeatspawn command with any args

command will repeat until it errors, and will exit with the
same exit code as the command being repeated
```

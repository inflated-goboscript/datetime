# datetime.gs

[![test](https://img.shields.io/badge/open-test-blue)](https://turbowarp.org?project_url=raw.githubusercontent.com/inflated-goboscript/datetime/main/test/test.sb3)
[![demo](https://img.shields.io/badge/open-demo-purple)](https://turbowarp.org?project_url=raw.githubusercontent.com/inflated-goboscript/datetime/main/demo/demo.sb3)
[![Build](https://github.com/inflated-goboscript/datetime/actions/workflows/gobuild.yml/badge.svg)](https://github.com/inflated-goboscript/datetime/actions/workflows/gobuild.yml)
[![Run /test/](https://github.com/inflated-goboscript/datetime/actions/workflows/gstest.yml/badge.svg)](https://github.com/inflated-goboscript/datetime/actions/workflows/gstest.yml)

> datetime struct operations

This is a datetime library which is built for [goboscript](https://github.com/aspizu/goboscript).
It is designed to be used with [inflator](https://github.com/inflated-goboscript/inflator).

## Credits

...

## Installation

Make sure you have inflator installed. It's installable from the gtp.

`inflate install datetime`

add datetime to your `inflator.toml` config:
```toml
[dependencies]
# ...
datetime = "datetime"
```

## Development

use `inflate install -e .`:

1. clone the respository: `git clone https://github.com/inflated-goboscript/datetime`
2. `cd datetime`
3. `inflate install -e .`
4. `cd test`
5. `inflate`
6. `goboscript build`
7. open `test.sb3`
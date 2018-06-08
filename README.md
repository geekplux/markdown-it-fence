# markdown-it-fence

[![NPM version](https://img.shields.io/npm/v/markdown-it-fence.svg?style=flat)](https://npmjs.com/package/markdown-it-fence) [![NPM downloads](https://img.shields.io/npm/dm/markdown-it-fence.svg?style=flat)](https://npmjs.com/package/markdown-it-fence) [![Build Status](https://img.shields.io/circleci/project/geekplux/markdown-it-fence/master.svg?style=flat)](https://circleci.com/gh/geekplux/markdown-it-fence) [![codecov](https://codecov.io/gh/geekplux/markdown-it-fence/branch/master/graph/badge.svg)](https://codecov.io/gh/geekplux/markdown-it-fence)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](http://donate.geekplux.com)

> fence customize plugin for markdown-it

## Install

```bash
yarn add markdown-it-fence --save
npm install markdown-it-fence --save
```

## Usage

```js
const markdownitfence = require('markdown-it-fence')

function yourPlugin (md, options) {
  return markdownitfence(md, 'yourPluginName', {
    marker: yourMarker,   // default is '`'
    render: yourRender,
    validate: yourValidate
  })
}

const md = require('markdown-it')();
md.use(yourPlugin).render(`content you want to parse`)

```

### Option params

##### marker

Type: `string`<br>
Default: `

Marker of fence block.

##### render

Type: `function`<br>
Default: [defaultRender](./src/index.js)

Render function.

##### validate

Type: `function`<br>
Default: [defaultValidate](./src/index.js)

Validate function.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**markdown-it-fence** © [geekplux](https://github.com/geekplux), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by geekplux with help from contributors ([list](https://github.com/geekplux/markdown-it-fence/contributors)).

> [github.com/geekplux](https://github.com/geekplux) · GitHub [@geekplux](https://github.com/geekplux) · Twitter [@geekplux](https://twitter.com/geekplux)

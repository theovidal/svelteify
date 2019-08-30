<div align=center>
  <img src="https://github.com/exybore/svelteify/blob/develop/packages/docs/public/img/logo.png?raw=true" alt="logo" width="150" />
  <h2>Material components library for Svelte</h2>
  <a href="#license">
    <img src="https://img.shields.io/npm/l/svelteify" />
  </a>
  <a href="https://discord.becauseofprog.fr">
    <img src="https://img.shields.io/discord/272454426038370304?color=blue&logo=discord" />
  </a>
  <a href="https://npmjs.org/package/svelteify">
    <img src="https://img.shields.io/npm/dm/svelteify?color=orange&logo=npm" />
    <img src="https://img.shields.io/npm/v/svelteify?color=yellow" />
  </a>
  <a href="https://github.com/exybore/svelteify/issues">
    <img src="https://img.shields.io/github/issues/exybore/svelteify?color=brightgreen" />
  </a>
  <a href="https://github.com/exybore/svelteify/stargazers">
    <img src="https://img.shields.io/github/stars/exybore/svelteify?style=social"/>
  </a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fexybore%2Fsvelteify?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fexybore%2Fsvelteify.svg?type=shield"/></a>
  <a href="https://lerna.js.org"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="maintained with lerna"/></a>
</div>

- [📦 Packages](#-packages)
- [💻 Developing](#-developing)
- [✨ Contributing](#-contributing)
- [📜 Credits](#-credits)
- [🔐 License](#-license)

Welcome on the Svelteify repository ! It's a young framework which provides Material components using the Svelte framework. It is :

- **Beautiful :** the framework works with the stylesheet of <a href="https://github.com/vuetifyjs/vuetify">Vuetify</a>, which provides clean components
- **Customizable :** you can configure colors used across the application, and a dark mode. Moreover, you can choose which component to use.
- **Dependencies-less :** the library includes all the compiled JavaScript and CSS, so you don't have to install anything

## 📦 Packages

All the packages are managed using lerna and stored in the `packages` directory :

- [docs](packages/docs) : the documentation for the library
- [svelteify](packages/svelteify) : the main library
- [test-app](packages/test-app) : the application to test all components and properties

## 💻 Developing

Make sure you have [node.js 10 or later](https://nodejs.org), and [lerna](https://github.com/lerna/lerna).

First of all, install all the required dependencies :

```bash
npm install   # Using NPM
yarn install  # Using Yarn
```

Then, bootstrap the dependencies using lerna :

```bash
lerna bootstrap
```

To build the library, go into its folder and run the `build` script :

```bash
npm run build  # Using NPM
yarn build     # Using Yarn
```

To run the testing app or the documentation with live reload, go into its folder and run the `dev` script :

```bash
npm run dev  # Using NPM
yarn dev     # Using Yarn
```

## ✨ Contributing

Please refer to the [contributing file](CONTRIBUTING.md).

## Roadmap

### 1.0

Core features :

- [x] Global theme
- [x] `app` properties on components
- [ ] Documentation

Components :

- [x] Application
- [x] Avatar
- [x] Button
- [x] Card
- [x] Chips
- [x] Divider
- [x] Footer
- [x] Grid
- [x] Icon
- [x] Image
- [x] List
- [x] Navigation drawers
- [ ] Tables
- [x] Toolbar
- [ ] Tooltip

### 1.1

Core features :

- [ ] Icon choose
- [ ] More theme options
- [ ] Ripples

Components :

- [ ] Alerts
- [ ] Badges
- [ ] Bottom navigation
- [ ] Breadcrumbs
- [ ] Form inputs
- [ ] Groups

## 📜 Credits

- Libraries : [Svelte](https://svelte.dev), [Vuetify](https://vuetifyjs.com)
- Maintainer : [Exybore](https://github.com/exybore)

## 🔐 License

MIT License

Copyright (c) 2019 Exybore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fexybore%2Fsvelteify.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fexybore%2Fsvelteify?ref=badge_large)

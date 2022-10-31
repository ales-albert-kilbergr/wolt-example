<p align="center">
  <a href="https://wolt.com/" target="blank"><img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://restia.cz/wp-content/uploads/2020/06/Sticker_Wolt_Logo_RGB_.png" width="200" alt="Ebot7 Logo" /></a>
</p>
<p align="center">
  <a href="http://nx.dev/" target="blank">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="32" alt="Nx"/>
  </a>
  <span>&nbsp;</span>
  <a href="https://www.typescriptlang.org/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1920px-Typescript_logo_2020.svg.png" height="32" alt="Typescript"/>
  </a>
  <span>&nbsp;</span>
  <a href="http://react.com/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="32" alt="Nest Logo" />
  </a>
  <a href="https://storybook.js.org/" target="blank">
    <img src="https://avatars.githubusercontent.com/u/22632046?s=280&v=4" height="32" alt="Nest Logo" />
  </a>
  <a href="https://formatjs.io/" target="blank">
    <img src="https://avatars.githubusercontent.com/u/50559490?s=200&v=4" height="32" alt="Nest Logo" />
  </a>
  <a href="https://mui.com/" target="blank">
    <img src="https://mui.com/static/logo.png" height="32" alt="Nest Logo" />
  </a>
</p>

- [Get started](#get-started)
- [Testing](#testing)
- [Codebase organisation](#codebase-organisation)
- [Intl](#intl)
- [FAQ:](#faq)
  - [How to provide custom testing files:](#how-to-provide-custom-testing-files)
- [Screenshots](#screenshots)

Example application.

This example application still has some space for improvements and code optimization.
(Test coverage, better hooks api, library for fetch requests, more generalization and reuse of ui components).

## Get started

- install dependencies via `yarn` or `npm`
- run `yarn start` for development. (Opens on http://localhost:4200)
- run `yarn nx storybook ui` for a storybook (Opens on http://localhost:4400)

## Testing

- run `yarn nx test react-intl` to test dynamic react inlt surroundings
- run `yarn nx test opening-hours-client` to test data parsing logic.

**What is tested and what not:**

The purpose was to provide an example how to test, and cover most critical
source code, rather then deliver high percentage coverage.

So a parsing logic stored in `libs/opening-hours-client/src/helpers` is covered
by unit tests.

A library `react-intl` has high test coverage.

Components in UI library are rather demonstrated in storybook gallery.

## Codebase organisation

Codebase is organized by `NX` workspace scripts, therefor most important parts
can be found in:

- `apps/opening-hours-browser-app`
- `libs/ui`
- `libs/opening-hours-client`

## Intl

Example is using `react-intl` library.

There are two scripts to support a workflow with translations:

- `yarn nx intl:extract` to extract all translatable messages into a dictionary
- `yarn nx intl:compile` to compile a dictionaries for three examplary languages.

The names of the weekdays and format of hours are managed by native `Intl` API
in the browser, therefor `HH PM|AM` notation is only used for `en-US` locale, other locales
formats the hours according to their native settings.

## FAQ:

### How to provide custom testing files:

- go to `apps/opening-hours-browser-app/src/assets/source-data`
- add your testing file
- update `apps/opening-hours-browser-app/src/assets/source-data/index.json` in
  order to see your file in the list of files to choose.

## Screenshots

<img src="/docs/img/screenshot-2022-10-31-174233.png" />
<img src="/docs/img/screenshot-2022-10-31-174250.png" />
<img src="/docs/img/screenshot-2022-10-31-174606.png" />
<img src="/docs/img/screenshot-2022-10-31-174625.png" />
<img src="/docs/img/screenshot-2022-10-31-174641.png" />
<img src="/docs/img/screenshot-2022-10-31-174659.png" />
<img src="/docs/img/screenshot-2022-10-31-180214.png" />

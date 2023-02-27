# [My Player](https://github.com/alanlachkar/my-player/)

This project is based on Canal+ technical test instructions.

<ins>Goal:</ins> Create a minimalist player with React and rx-player by using google api for video stream.

---

2 pages sont importantes :

- Le root `/` de l'URL mène à la HomePage. Elle est accessible sur le clic de l'icône en haut à gauche. Elle affiche une liste (venant d'un json) et le player en dessous;
- Le `/bonus-section` de l'URL mène à la page utilisant l'API `/scene/{timecode}`/cypress

Au clic d'une carte, l'url correspondant est chargé dans le player et les controleurs du player sont accessibles (s'il s'agit d'une video 'directfile')

Ne soyez pas trop méchant sur le visuel !

---

Mise en place et utilisation de la librairie react-router après ne pas l'avoir utilisé pendant loooongtemps ! Donc j'ai voulu voir ce que avait changé.
Mise en place et utilisation de la librairie rx-player.

Le choix d'architecture est expliqué plus bas.
Une configuration de tests Jest et Cypress a été mise en place. Des tests simples (en Jest et Cypress) ont été fait.
Une CI a été mise en place sur le project (via un github-action) buildant et lançant les tests.
Également via une github-action une mise à jour des dépendances est lancé hébomadairement.

---

## Introduction and project configuration

My Player is designed for minimum configuration and **you can use all you need**:

- React API 18 with Hooks [React hooks](https://fr.reactjs.org/docs/hooks-intro.html).
- Typescript [TS](https://www.typescriptlang.org/).
- Standard CSS (CSS-loader, style-loader) this project allow you to choose your standard (inline, styled-components typestyle,css modules, preprocessors SASS/LESS)
- Yarn package manager [yarn](https://yarnpkg.com/).
- Webpack bundler [webpack](https://webpack.js.org/).
- Babel JS compiler ECMAScript 2015+ [babel](https://babeljs.io/docs/en/) (arrow function, and so on).
- Google TS stylesheet [google TS stylesheet](https://google.github.io/styleguide/tsguide.html).
- Prettier [prettier](https://prettier.io/) configuration with VScode
- ESlint [ESlint](https://eslint.org/) linter fix auto config VScode
- Jest [Jest](https://jestjs.io/fr/) unit test
- Cypress [Cypress](https://www.cypress.io/) end to end testing (features workflow)
- Mochawesome report cypress HTML and NYC coverage report
- Axios for request HTTP handling data
- dotenv to configure .env

## Pre installation (toolings)

VS Code extensions used to develop faster.

- Prettier

(Optional) You can configure the prettier path of the project as your default prettier configuration or keep your own.

But if you run the .bat script on [Git hooks](#git-hooks) section below (recommended), it will configure prettier rules on pre-commit's git events according to the `<GIT_DIRECTORY>/.prettierrc.json`.

- ESlint

This plugin is used to help you to develop and add rules to stylesheet your coding style.

<a name='git-hooks'></a>

- Git hooks

Run the .bat script in `<GIT_DIRECTORY>/.git-hooks` to instanciate the git hooks configuration on your project.

# Installation

By default, the project port will be `8082`. Change `.env` with `HTTP_PORT={your_port}`. You can also setenv `HTTP_PORT` in `package.json`.

Don't forget to run `yarn install` to install all dependencies.

| Command lines           | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `yarn start`            | Start the app in development mode and open the app in your default browser          |
| `yarn build`            | Build project in one package for cloud provider                                     |
| `yarn cy:open`          | Start cypress HMI to run one or multiple integration tests files (e2e)              |
| `yarn cy:run`           | Run all integration tests files in command lines (e2e)                              |
| `yarn it`               | Integration test (e2e) for working flow test in folder `.coverage/cypress-coverage` |
| `yarn ut`               | Unit test created in jest and coverage in folder `.coverage/jest-coverage`          |
| `yarn reports:move`     | Copy in folder `.coverage` reports UT and IT                                        |
| `yarn reports:merge`    | Merge reports with Nyc                                                              |
| `yarn reports:combined` | Combined reports and create new report in `.coverage/combined`                      |
| `yarn reports:coverage` | Execute all coverages commands IT/UT and move, merge and combined                   |

## Project structure

| File or folder                  | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/index.tsx`                 | The entry file. This is where we import babel polyfills and render the App into the root DOM node. |
| `public/template.html`          | The only HTML file in our App. All scripts and styles will be injected here by Webpack.            |
| `src/assets/**`                 | The static assets exported to index.tsx if the latters doesn't exceed 5kb                          |
| `src/api/**`                    | Services API for managing all api requests, all data requests and response data                    |
| `src/pages/**`                  | Core application                                                                                   |
| `src/pages/MainPage.tsx`        | Main application routes, components that need to be mounted at all times                           |
| `src/components/**`             | Directory use for independant components reusable                                                  |
| `src/types/**`                  | Interface use to define Model structures                                                           |
| `src/utils/**`                  | All the utility, helpers, constants and enums that can be used across the application              |
| Cypress section                 |                                                                                                    |
| `.coverage/cypress-coverage/**` | Lcov and html report cypress for integration test                                                  |
| `cypress/**`                    | Cypress configuration for adding plugings, instruments coverage and testing                        |
| `cypress/integration/**`        | Integration test folder                                                                            |
| Jest section                    |                                                                                                    |
| `.coverage/jest-coverage/**`    | Lcov and html report jest for unit test                                                            |
| `./jest/**`                     | Jest configuration needed for files                                                                |
| `src/components/**/*.test.tsx`  | Jest unit tests files in component                                                                 |
| Combined Tests                  |                                                                                                    |
| `.coverage/combined/**`         | Coverage IT and UT                                                                                 |

## Reminder

Usually, all comand lines take into account Windows and linux environment. But just in case an error occurs, here are a quick reminder of command lines according to it environment. To use on the 'script' section in the `package.json`.

| Windows        | Linux  | Explanation               |
| -------------- | ------ | ------------------------- |
| copy           | cp     | Copy element(s)           |
| mv             | move   | Move element(s)           |
| del            | rm     | Delete element(s)         |
| backslash \\\  | path / | Separation between folder |

## Contributor

[Alan](https://github.com/alanlachkar)

### License

[MIT](https://opensource.org/licenses/MIT)

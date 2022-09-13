[![Version](https://img.shields.io/github/v/release/mong/qmongjs?sort=semver)](https://github.com/mong/qmongjs/releases)
[![CodeQL](https://github.com/mong/qmongjs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mong/qmongjs/actions/workflows/codeql-analysis.yml)
[![Deploy app to AWS](https://github.com/mong/qmongjs/actions/workflows/aws_deploy.yml/badge.svg)](https://github.com/mong/qmongjs/actions/workflows/aws_deploy.yml)
[![Node.js CI](https://github.com/mong/qmongjs/actions/workflows/node.js.yml/badge.svg)](https://github.com/mong/qmongjs/actions/workflows/node.js.yml)
[![Codecov test coverage](https://codecov.io/gh/mong/qmongjs/branch/main/graph/badge.svg)](https://codecov.io/gh/mong/qmongjs?branch=main)
[![GitHub open issues](https://img.shields.io/github/issues/mong/qmongjs.svg)](https://github.com/mong/qmongjs/issues)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

`qmongjs` is the code behind [www.skde.no/kvalitetsregistre](https://www.skde.no/kvalitetsregistre/alle/sykehus).

## Installation

You can install the latest version of qmongjs from [github](https://github.com/mong/qmongjs).

## Run it locally

This is done in two different terminal windows.

### Terminal 1

Start a `mysql` server, so `mong-api` will get data

```sh
sudo systemctl start mysqld
```

If this is the first time or if you want to update data, follow [these instructions](https://mong.github.io/#/utvikling?id=kj%c3%b8re-database-lokalt).

Run `mong-api`

```sh
git clone git@github.com:mong/mong-api
cd mong-api
yarn install
yarn start # starts at http://localhost:4000
```

The data in database can be manipulated by using for instance `mysql-workbench`.

### Terminal 2

Run `qmongjs`

```sh
git clone git@github.com:mong/qmongjs
cd qmongjs
yarn install
yarn start # starts at http://localhost:3000
```

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all the modules listed as dependencies in package.json.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/kvalitetsregistre](http://localhost:3000/kvalitetsregistre) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

### `yarn test`

Launches the test runner in the interactive watch mode.

## Ethics

Please note that the 'qmongjs' project is released with a
[Contributor Code of Conduct](CODE_OF_CONDUCT.md).
By contributing to this project, you agree to abide by its terms.

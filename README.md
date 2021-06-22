# Boilerplate rss_reader

## Index

[commands](#Commands)

[instalation and usage](#Instalation-and-usage)

---

## Commands

### npm

`start` start packer (to compile the js the app uses)

`format` format src ts and tsx files with tslint --fix and prettier

`format-soft` format src ts and tsx files with prettier

`android` run app on android and/or an emulator using .env.dev as enviroment variables

`ios` run app on ios emulator and open it if it's not running

`test` run tests,

`pod` install ios pods dependencies

`lint` run linter for .ts and .tsx files in src

---

## Instalation and usage

### Install dependencies

1. run `yarn` or `npm i` to install dependencies
2. run `yarn pod` or `npm run pod` to install ios dependencies if running on mac

### run manually

on iOS is required to open xcode and select a development team

1. run `yarn start` or `npm start` in terminal (keep open)
2. run `yarn ios` or `yarn android` (or npm run ios/android) to launch the app. Keep in mind that you have to launch android emulator manually

### run with vscode (automatically)

1. intall [react native tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
2. run debug android (with emulator open or mobile connected) or debug ios

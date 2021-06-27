# RSS Reader boilerplate

This is a basic RSS Reader application where we have used the news feed of the NASA web: http://www.nasa.gov/rss/dyn/breaking_news.rss. In this readme I will show how is structure this basic app.

I implemented a basic solution with a reader hook. Coordinate using another fuction hooks using fetching and cached data. 

## Índex

* [Tech Stack](#Tech-Stack)
  * [Application Blueprint](#application-blueprint)
  * [Testing Setup](#testing-setup)
  * [Dev tools](#dev-tools)
* [Code structure](#Code-Structure)

## Tech Stack

### Application Blueprint

* Always up-to-date [React Native](https://facebook.github.io/react-native/) scaffolding.
* [React Navigation](https://reactnavigation.org/) for awesome navigation with 60fps transitions.
* [Typescript](https://www.typescriptlang.org/) for static type checking.
* [axios](https://github.com/axios/axios) Javascript library used to make HTTP requests from node.js. Used with different advantages.
* [xmldom](https://github.com/xmldom/xmldom) convert an XML string into a DOM tree for the RSS reader.

### Testing Setup

* [Jest](https://facebook.github.io/jest/) for unit testing application code and providing coverage information.
* [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) You want to write maintainable tests for your React Native components.

### Dev tools

* [TSLint](https://palantir.github.io/tslint/) An extensible linter for the TypeScript language
* [Prettier](https://github.com/prettier/prettier) as an opinionated code formatter


## Code structure

### Components

Only shared components used across features are placed here.

```bash
./src/components/
├── input.tsx
├── newsItem.tsx
```

### Assets

As the name suggests, all the static assets should reside here. Each asset should be registered and exported from the /index.js.

### Hooks

Spliting our components into smaller fuctions based on what pieces are related, we can find this files related with the functionalities we need as fetch or RSS reader.

```bash
./src/hooks/
├── use-cache.tsx
├── use-fetch.tsx
├── use-navigation.tsx
├── use-rss-parser.tsx
```
### Navigation

All routing of the app resides here. This app only contains one stack Navigation for these two screens. All the stack params types are declared on ./types/navigation.ts.

### Screens

```bash
./src/screens/
├── newsDetailScreen.tsx
├── newsListScreen.tsx
```

### Types

Defined all types used inside our app, where we can find it divided related to its most relevant aspects.

```bash
./src/types/
├── components.tsx
├── data.tsx
├── navigation.tsx
```

### Utils

All the utility/helper methods, validations, etc that can be shared across our entire project are added here.

### __ tests __ && __ mocks __

Jest framework is default supported by react for unit testing the application. Using [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) we have develop the basic unit tests for our small components and hooks.


| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Table of Contents

  1. [Intro](#intro)
  1. [Development prerequisites](#development-prerequisites)
  1. [Setup for mac](#setup-for-mac)
  1. [Git conventions](#git-conventions)
  1. [Run application](#run-application)
  1. [Additional resources](#additional-resources)
  1. [Troubleshooting](#troubleshooting)
  1. **[React/JSX style guide](STYLE_GUIDE_DOC.md)**

## Intro

This is boilerplate repository for `react-native` project. 
This boilerplate should be used to initiate every `react-native` project in Kilo.Health.

**Usage:**

1. Clone/Download this repo
2. Remove .git directory
```bash
rm -rf .git
```
3. Rename project by running following script
```bash
yarn rename "<your app name here>" -b <your app bundle id>
```
4. Go read React/JSX style guide 👀
5. Go code 🚀

## Development prerequisites

- Yarn
- Node
- Fastlane
- Cocapods
- Xcode
- Android Studio
- react-native-cli

## Setup for mac

**PRO TIP:** Make sure you’re connected to the internet!🙃

Open your terminal or run it inside this project's integrated terminal:

```bash
chmod -R 777 ./scripts
./scripts/reactNativeStarterPack.sh
```

**NOTE:** Script doesn't cover Xcode installation so you have to grab it from [here.](https://developer.apple.com/xcode/resources/)

## Git conventions

Branches should be named in a following manner:

```bash
// new feature
git checkout -b feature/comprehensible-name-<trello card number (if exists)>

// refactoring
git checkout -b refactoring/comprehensible-name-<trello card number (if exists)>

// bugfix
git checkout -b fix/comprehensible-name-<trello card number (if exists)>

// dependency updates
git checkout -b update/package-name-<trello card number (if exists)>
git checkout -b update/orther-comprehensible-name-<trello card number (if exists)>
```

Make sure that for every bigger change you have checked out to new branch.
Same goes for complicated package updates (e.g. `react-native`). Also make
sure to be on the new branch when changing something inside native projects
(namely `ios` and `android` directories).

## Run application

**NOTE:** We always use **Yarn** as our default package manager tool.

```bash 
// start development server
yarn start

// run ios app
yarn ios

// run android app
yarn android
```

## Additional resources

- [READ Kilo.Health React/JSX style guide](STYLE_GUIDE_DOC.md)
- [Painless React Native Setup for Mac](https://shift.infinite.red/painless-react-native-setup-for-mac-windows-linux-956c23d2abf9)
- [Fastlane setup](https://carloscuesta.me/blog/shipping-react-native-apps-with-fastlane/)

## Troubleshooting

Here we add troubleshooting tips if something needs more setup or one of the module is not working properly.

If you have encountered some problem and managed to fix it please leave a comment. 
Comment should be written in following manner:

1. Node module name with version (for example: `react-native@0.50.0`)
1. Error name or text
1. Platform [`ios`, `android`]
1. Steps to reproduce (if there is some)
1. Solution or link to solution
_____________________________________________________________________

...

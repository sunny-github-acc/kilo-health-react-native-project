echo "Starting bootstrapping"

# Check for Homebrew, install if we don't have it
if test ! $(which brew); then
    echo "Installing homebrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Update homebrew recipes
brew update

# Install GNU core utilities (those that come with OS X are outdated)
brew install coreutils
brew install gnu-sed
brew install gnu-tar
brew install gnu-indent
brew install gnu-which
brew install grep

# Install GNU `find`, `locate`, `updatedb`, and `xargs`, g-prefixed
brew install findutils

# Install Bash 4
brew install bash

# Install stuff to run all JS related stuff
brew tap wix/brew

JS_PACKAGES=(
  yarn
  node
  npm
  watchman
  applesimutils
)

echo "Installing packages..."
brew install "${JS_PACKAGES[@]}"
brew tap homebrew/cask-versions
brew install fastlane

APPS=(
  homebrew/cask-versions/adoptopenjdk8
  slack
  cocoapods
  reactotron
  android-sdk
  android-studio
  android-platform-tools
  visual-studio-code
)

echo "Installing apps..."
brew cask install "${APPS[@]}"

echo "Installing global node modules..."
npm i -g react-native-cli detox-cli code-push-cli appcenter-cli

# Setup env variables

# Android
{
  echo "export ANDROID_HOME=~/Library/Android/sdk"
  echo "export PATH=\${PATH}:\${ANDROID_HOME}/tools"
  echo "export PATH=\${PATH}:\${ANDROID_HOME}/platform-tools"
} >> ~/.bash_profile

# Fastlane
echo "export PATH=~/.fastlane/bin:\${PATH}" >> ~/.bash_profile

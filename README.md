# Wordle International

## Description

A clone of wordle with custom word lengths and attempt counts, 15 languages supported built using modern web development technologies

You can try it [here](https://wordle-international.netlify.app/).

## Details

This started out as my attempt of making a faithful recreation of wordle which turned into an expanded and unlimited version of the game. It utilises my custom [random word API](https://github.com/vsharha/random-words) built using FastAPI to provide support for all the languages.


This is the repository for the front end of the game which is built in React.

#### Libraries used:
- **Redux toolkit**: global state management
- **react-hot-toast**: custom notifications
- **react-icons**: icons used throughout the project
- **react-router**: reading and applying url parameters
- **tailwindCSS**: styling
- **simple-keyboard-layout**: keyboard layouts for the various languages available in the API
- **random-words**: fallback random words source for when the API fails to respond

There are various custom hooks for game logic and animation.

### Language support

The game currently supports 15 languages:

- Armenian
- Czech
- English
- Georgian
- German
- Greek
- Hebrew
- Hungarian
- Macedonian
- Polish
- Russian
- Spanish
- Swedish
- Turkish
- Ukrainian

"use client";

import { useSelector } from "react-redux";
import { getGuesses, getWordToGuess } from "@/slices/wordleSlice.js";

function getColors(wordToGuess, word) {
  // word can be either a string or an array of graphemes
  const wordArray = Array.isArray(word) ? word : word.split("");

  let colors = Array(wordArray.length).fill("guessed");
  let used = Array(wordArray.length).fill(false);

  let wordToGuessLower = wordToGuess.toLowerCase();
  let wordLower = wordArray.map((char) => char.toLowerCase());

  for (let i = 0; i < wordLower.length; i++) {
    if (wordLower.at(i) === wordToGuessLower.at(i)) {
      colors[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < wordLower.length; i++) {
    if (colors[i] === "guessed") {
      for (let j = 0; j < wordLower.length; j++) {
        if (!used[j] && wordLower.at(i) === wordToGuessLower.at(j)) {
          colors[i] = "present";
          used[j] = true;
          break;
        }
      }
    }
  }

  return wordLower.map((letter, i) => ({
    letter,
    color: colors.at(i),
  }));
}

export function useColors(isCurrent, word) {
  const wordToGuess = useSelector(getWordToGuess);

  if (isCurrent || !word) return [];
  else return getColors(wordToGuess, word);
}

export function useKeyboardColors() {
  const wordToGuess = useSelector(getWordToGuess);
  const guesses = useSelector(getGuesses);

  let keyboardColorMap = {};
  for (let colorMap of guesses.map((guess) => getColors(wordToGuess, guess))) {
    for (let { letter, color } of colorMap) {
      switch (keyboardColorMap[letter]) {
        case "correct":
          continue;
        case "partial":
          if (color === "correct") keyboardColorMap[letter] = color;
          continue;
        case "guessed":
        default:
          keyboardColorMap[letter] = color;
      }
    }
  }

  return keyboardColorMap;
}

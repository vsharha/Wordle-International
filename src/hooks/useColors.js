import { useSelector } from "react-redux";
import { getGuesses, getWordLength, getWordToGuess } from "../wordleSlice.js";

function getColors(wordToGuess, word) {
    let colors = Array(word.length).fill("guessed");
    let used = Array(word.length).fill(false);

    for (let i = 0; i < word.length; i++) {
        if (word.at(i) === wordToGuess.at(i)) {
            colors[i] = "correct";
            used[i] = true;
        }
    }

    for (let i = 0; i < word.length; i++) {
        if (colors[i] === "guessed") {
            for (let j = 0; j < word.length; j++) {
                if (!used[j] && word.at(i) === wordToGuess.at(j)) {
                    colors[i] = "present";
                    used[j] = true;
                    break;
                }
            }
        }
    }

    return word.split("").map((letter, i) => ({
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
        console.log(colorMap);
    }
}

import { useSelector } from "react-redux";
import { getWordLength, getWordToGuess } from "../wordleSlice.js";

export function useColors(isCurrent, word) {
    const wordLength = useSelector(getWordLength);
    const wordToGuess = useSelector(getWordToGuess);

    if (isCurrent || !word) return [];

    let colors = Array(wordLength).fill("guessed");
    let used = Array(wordLength).fill(false);

    for (let i = 0; i < wordLength; i++) {
        if (word.at(i) === wordToGuess.at(i)) {
            colors[i] = "correct";
            used[i] = true;
        }
    }

    for (let i = 0; i < wordLength; i++) {
        if (colors[i] === "guessed") {
            for (let j = 0; j < wordLength; j++) {
                if (!used[j] && word.at(i) === wordToGuess.at(j)) {
                    colors[i] = "present";
                    used[j] = true;
                    break;
                }
            }
        }
    }

    return colors;
}

export function useKeyboardColors() {}

export default function getColors(wordLength, wordToGuess, isCurrent, word) {
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

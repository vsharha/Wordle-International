import DisplayLetter from "./DisplayLetter.jsx";
import { useSelector } from "react-redux";
import { getMessage, getWordLength, getWordToGuess } from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

function countChar(str, char) {
  let count = 0;
  for (let c of str) {
    if (c === char) count++;
  }
  return count;
}

function DisplayWord({ word, current }) {
  const wordLength = useSelector(getWordLength);

  const wordToGuess = useSelector(getWordToGuess);
  const reduxMessage = useSelector(getMessage);

  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (reduxMessage && current) {
      console.log(reduxMessage);
      setShake(true);
    }
  }, [reduxMessage, current]);

  function getColors() {
    if (current || !word) return [];

    let colors = [];

    for (let i = 0; i < wordLength; i++) {
      if (word.at(i) === wordToGuess.at(i)) {
        colors.push("correct");
      } else if (wordToGuess.includes(word.at(i))) {
        colors.push("present");
      } else {
        colors.push("guessed");
      }
    }

    // deduplication
    for (let i = 0; i < wordLength; i++) {
      if (
        colors.filter(
          (color, j) => word.at(j) === word.at(i) && (color === "correct" || color === "present"),
        ).length <
        countChar(wordToGuess, word.at(i)) - colors.filter((color) => color === "correct").length
      ) {
        colors[i] = "guessed";
      }
    }
    return colors;
  }

  let colorMap = getColors();

  return (
    <div
      onAnimationEnd={() => setShake(false)}
      className={twMerge("flex gap-1.5 h-12 w-full justify-center", shake ? "animate-shake" : "")}
    >
      {Array.from({ length: wordLength }, (_, i) => {
        const letter = word.at(i);
        const color = colorMap.at(i);
        return <DisplayLetter letter={letter} color={color ? color : ""} key={i} />;
      })}
    </div>
  );
}

export default DisplayWord;

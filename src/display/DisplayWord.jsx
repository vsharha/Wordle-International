import DisplayLetter from "./DisplayLetter.jsx";
import { useSelector } from "react-redux";
import {
  getCurrentGuess,
  getGuesses,
  getMessage,
  getWordLength,
  getWordToGuess,
} from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";

function countChar(str, char) {
  let count = 0;
  for (let c of str) {
    if (c === char) count++;
  }
  return count;
}

function DisplayWord({ word, wordIndex }) {
  const wordLength = useSelector(getWordLength);

  const wordToGuess = useSelector(getWordToGuess);
  const guesses = useSelector(getGuesses);
  const isCurrent = wordIndex === guesses.length;

  //rotate anim
  const [rotateIndex, setRotateIndex] = useState(null);

  useEffect(() => {
    if (guesses.length !== 0 && wordIndex === guesses.length - 1) {
      setRotateIndex(0);
    }
  }, [wordIndex, guesses.length]);

  function onRotateEnd() {
    setRotateIndex((i) => {
      return i < word.length ? i + 1 : null;
    });
  }

  //shake anim
  const reduxMessage = useSelector(getMessage);

  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (reduxMessage && isCurrent) {
      setShake(true);
    }
  }, [reduxMessage, isCurrent]);

  //color
  function getColors() {
    if (isCurrent || !word) return [];

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

  //pop in anim
  const [popInIndex, setPopInIndex] = useState(null);
  const prevLengthRef = useRef(word.length);

  useEffect(() => {
    if (isCurrent) {
      if (word.length > prevLengthRef.current) {
        const index = word.length - 1;
        if (isCurrent && word.at(index)) {
          setPopInIndex(index);
        }
      }
      prevLengthRef.current = word.length;
    }
  }, [isCurrent, word]);

  return (
    <div
      onAnimationEnd={() => setShake(false)}
      className={twMerge("flex gap-1.5 h-15 justify-center", shake ? "animate-shake" : "")}
    >
      {Array.from({ length: wordLength }, (_, i) => {
        const letter = word.at(i);
        const color = colorMap.at(i);
        return (
          <DisplayLetter
            letter={letter}
            color={color ? color : ""}
            isCurrent={isCurrent}
            popIn={i === popInIndex}
            rotate={i === rotateIndex}
            onRotateEnd={onRotateEnd}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default DisplayWord;

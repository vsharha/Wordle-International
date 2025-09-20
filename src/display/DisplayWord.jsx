import DisplayLetter from "./DisplayLetter.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentGuess,
  getGuesses,
  getMessage,
  getWordLength,
  getWordToGuess,
  setKeyboardDisabled,
} from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import display from "./Display.jsx";

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (guesses.length !== 0 && wordIndex === guesses.length - 1) {
      dispatch(setKeyboardDisabled(true));
      setRotateIndex(0);
    }
  }, [wordIndex, guesses.length, dispatch]);

  function onRotateEnd() {
    setRotateIndex((i) => {
      if (i < word.length - 1) return i + 1;
      else {
        dispatch(setKeyboardDisabled(false));
        return null;
      }
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

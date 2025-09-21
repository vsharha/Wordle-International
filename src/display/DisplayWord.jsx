import DisplayLetter from "./DisplayLetter.jsx";
import { useSelector } from "react-redux";
import { getGuesses, getWordLength, getWordToGuess } from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import useShake from "../animation/useShake.js";
import useRotate from "../animation/useRotate.js";
import usePopIn from "../animation/usePopIn.js";
import getColors from "../shared/getColors.js";

function DisplayWord({ word, wordIndex }) {
  const wordLength = useSelector(getWordLength);
  const wordToGuess = useSelector(getWordToGuess);
  const guesses = useSelector(getGuesses);
  const isCurrent = wordIndex === guesses.length;

  const { rotateIndex, onRotateEnd } = useRotate(word, wordIndex);
  const { shake, onShakeEnd } = useShake(isCurrent);
  const { popInIndex } = usePopIn(word, isCurrent);

  let colorMap = getColors(wordLength, wordToGuess, isCurrent, word);

  return (
    <div
      onAnimationEnd={onShakeEnd}
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

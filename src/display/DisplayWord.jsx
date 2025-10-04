import DisplayLetter from "./DisplayLetter.jsx";
import { useSelector } from "react-redux";
import { getGuesses, getWordLength } from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import useShake from "../animation/useShake.js";
import useRotate from "../animation/useRotate.js";
import usePopIn from "../animation/usePopIn.js";
import { useColors } from "../hooks/useColors.js";

function DisplayWord({ word, wordIndex, skip, skipArray, skipWordLen, className }) {
  const wordLength = useSelector(getWordLength);
  const guesses = useSelector(getGuesses);
  const isCurrent = wordIndex === guesses.length;

  const { rotateIndex, onRotateEnd } = useRotate(word, wordIndex);
  const { shake, onShakeEnd } = useShake(isCurrent);
  const { popInIndex } = usePopIn(word, isCurrent);

  let colorMap = useColors(isCurrent, word);

  return (
    <div
      onAnimationEnd={onShakeEnd}
      className={twMerge("flex gap-1.5 w-full flex-1 max-h-15 justify-center", shake ? "animate-shake" : "", className)}
    >
      {Array.from({ length: skipWordLen? skipWordLen: wordLength }, (_, i) => {
        const letter = word.at(i);
        let color;
        if (skip) {
          color = "correct";
        } else if (skipArray?.at(i)) {
          color = skipArray.at(i);
        } else {
          color = colorMap.at(i)?.color
        }
        const skipRotation = skip || skipArray?.at(i)

        return (
          <DisplayLetter
            letter={letter}
            color={color ? color : ""}
            isCurrent={isCurrent}
            popIn={i === popInIndex}
            rotate={i === rotateIndex}
            onRotateEnd={onRotateEnd}
            key={i}
            skip={skipRotation}
          />
        );
      })}
    </div>
  );
}

export default DisplayWord;

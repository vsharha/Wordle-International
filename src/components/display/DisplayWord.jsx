import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import {getGuesses, getWordLength} from "@/slices/wordleSlice";
import useRotate from "@/hooks/animation/useRotate";
import useShake from "@/hooks/animation/useShake";
import usePopIn from "@/hooks/animation/usePopIn";
import {useColors} from "@/hooks/useColors";
import DisplayLetter from "@/components/display/DisplayLetter";

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
      className={twMerge("flex gap-1.5 w-full justify-center", shake ? "animate-shake" : "", className)}
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

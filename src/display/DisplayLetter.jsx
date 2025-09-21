import { twMerge } from "tailwind-merge";
import { themeColors } from "../shared/themeColors.js";
import { useEffect, useState } from "react";

function DisplayLetter({ letter, color, popIn, rotate, onRotateEnd, skip }) {
  const [doPopIn, setDoPopIn] = useState(popIn);
  const [doRotate, setDoRotate] = useState(rotate);

  const [hasRotated, setHasRotated] = useState(false);

  useEffect(() => {
    if (popIn) {
      setDoPopIn(true);
    }
  }, [popIn]);

  useEffect(() => {
    if (rotate) {
      setDoRotate(true);
    }
  }, [rotate]);

  return (
    <span
      onAnimationStart={(e) => {
        if (e.animationName === "rotate") {
          setHasRotated(true);
        }
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "pop-in") {
          setDoPopIn(false);
        }
        if (e.animationName === "rotate") {
          setDoRotate(false);
          onRotateEnd();
        }
      }}
      className={twMerge(
        "uppercase flex items-center justify-center aspect-square h-full border-2 border-border font-bold dark:border-border-dark text-3xl text-font dark:text-font-dark",
        letter ? "border-border-letter dark:border-border-letter-dark" : "",
        skip || (color && hasRotated) ? themeColors[color] : "",
        doPopIn ? "animate-pop-in" : "",
        doRotate ? "animate-rotate" : "",
      )}
    >
      {letter}
    </span>
  );
}

export default DisplayLetter;

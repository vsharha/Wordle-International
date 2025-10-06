import KeyboardLine from "./KeyboardLine.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import { getNormalizedLayout } from "./getKeyboardLayout.js";
import { useSelector } from "react-redux";
import { getLanguage, getStatus } from "../wordleSlice.js";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

function Keyboard() {
  const language = useSelector(getLanguage)

  const keyboard = getNormalizedLayout(language)

  useKeyboardColors();

  const status = useSelector(getStatus)

  return (
    <div className="flex items-center justify-center flex-col gap-1.5 w-screen px-1 pb-2 md:pb-0 h-full" onClick={(e)=> {
      if (status !== "playing") {
        e.stopPropagation();
      }
    }}>
      {keyboard.map((line, i) => (
        <KeyboardLine line={line} key={i} />
      ))}
    </div>
  );
}

export default Keyboard;

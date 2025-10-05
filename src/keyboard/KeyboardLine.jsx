import KeyboardButton from "./KeyboardButton.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import { twMerge } from "tailwind-merge";

function KeyboardLine({ line, addSpace, shrink }) {
  const colorMap = useKeyboardColors();

  return (
    <div
      className={twMerge("flex flex-row w-full gap-1 justify-center h-15 justify-center md:gap-1.5 md:h-15", addSpace ? "px-4.5" : "", shrink ? "h-10": "")}
    >
      {line.map((letter) => (
        <KeyboardButton letter={letter} color={colorMap[letter]} key={letter} />
      ))}
    </div>
  );
}

export default KeyboardLine;

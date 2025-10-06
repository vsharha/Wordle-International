import KeyboardButton from "./KeyboardButton.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import { twMerge } from "tailwind-merge";

function KeyboardLine({ line }) {
  const colorMap = useKeyboardColors();

  return (
    <div
      className={twMerge("flex flex-row w-full justify-center justify-center flex-1")}
    >
      {line.map(({letter, width}, i) => (
        <KeyboardButton letter={letter} color={colorMap[letter]} key={i} width={width}/>
      ))}
    </div>
  );
}

export default KeyboardLine;

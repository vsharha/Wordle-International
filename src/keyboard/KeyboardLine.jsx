import KeyboardButton from "./KeyboardButton.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import { twMerge } from "tailwind-merge";

function KeyboardLine({ line, shrink }) {
  const colorMap = useKeyboardColors();

  return (
    <div
      className={twMerge("flex flex-row w-full justify-center h-16 justify-center md:h-16", shrink ? "h-12": "")}
    >
      {line.map(({letter, width}) => (
        <KeyboardButton letter={letter} color={colorMap[letter]} key={letter} width={width}/>
      ))}
    </div>
  );
}

export default KeyboardLine;

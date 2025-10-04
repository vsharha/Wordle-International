import KeyboardButton from "./KeyboardButton.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";

function KeyboardLine({ line, addSpace }) {
  const colorMap = useKeyboardColors();

  return (
    <div
      className={`flex flex-row w-full gap-1 justify-center h-15 justify-center md:gap-1.5 ${addSpace ? "px-4.5" : ""}`}
    >
      {line.map((letter) => (
        <KeyboardButton letter={letter} color={colorMap[letter]} key={letter} />
      ))}
    </div>
  );
}

export default KeyboardLine;

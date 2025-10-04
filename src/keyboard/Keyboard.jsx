import KeyboardLine from "./KeyboardLine.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import getKeyboardLayout from "./getKeyboardLayout.js";
import { useSelector } from "react-redux";
import { getLanguage } from "../wordleSlice.js";

function Keyboard() {
  const language = useSelector(getLanguage)

  const keyboard = getKeyboardLayout(language)

  useKeyboardColors();

  return (
    <div className="flex items-center justify-center flex-col gap-1.5 w-screen px-2 pb-3 md:pb-0">
      {keyboard.map((line, i) => (
        <KeyboardLine line={line} key={i} addSpace={keyboard.at(0).length > keyboard.at(1).length ? i===1:i===2} />
      ))}
    </div>
  );
}

export default Keyboard;

import KeyboardLine from "./KeyboardLine.jsx";
import { useKeyboardColors } from "../hooks/useColors.js";
import { getNormalizedLayout } from "./getKeyboardLayout.js";
import { useSelector } from "react-redux";
import { getLanguage } from "../wordleSlice.js";

function Keyboard() {
  const language = useSelector(getLanguage)

  const keyboard = getNormalizedLayout(language)

  useKeyboardColors();

  return (
    <div className="flex items-center justify-center flex-col gap-1.5 w-screen px-1 pb-2 md:pb-0">
      {keyboard.map((line, i) => (
        <KeyboardLine line={line} key={i} shrink={keyboard.length>3}/>
      ))}
    </div>
  );
}

export default Keyboard;

import KeyboardLine from "./KeyboardLine.jsx";
import { useSelector } from "react-redux";
import { getWordToGuess } from "../wordleSlice.js";
import Message from "../ui/Message.jsx";

function Keyboard() {
  const keyboard = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  const wordToGuess = useSelector(getWordToGuess);

  function getColors() {}

  return (
    <div className="flex items-center justify-center flex-col gap-2 w-screen px-2 pb-3 md:pb-0">
      {keyboard.map((line, i) => (
        <KeyboardLine line={line} key={line} addSpace={i === 1} />
      ))}
    </div>
  );
}

export default Keyboard;

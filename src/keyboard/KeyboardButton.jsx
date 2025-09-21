import { twMerge } from "tailwind-merge";
import { submitCurrentGuess, updateCurrentGuess } from "../wordleSlice.js";
import { useDispatch } from "react-redux";
import { IoBackspaceOutline } from "react-icons/io5";

import { themeColors } from "../shared/themeColors.js";

function KeyboardButton({ letter, color }) {
  const isEnter = letter === "Enter";
  const isBackspace = letter === "Backspace";
  const isWide = isEnter || isBackspace;

  const dispatch = useDispatch();

  function handleClick() {
    if (isEnter) {
      dispatch(submitCurrentGuess());
      return;
    }

    dispatch(updateCurrentGuess(letter));
  }

  return (
    <button
      className={twMerge(
        "flex items-center justify-center bg-button text-font dark:bg-button-dark dark:text-font-dark font-bold uppercase rounded-sm text-xl w-10 h-full",
        isWide ? "w-16" : "",
        isEnter ? "text-xs" : "",
        color ? themeColors[color] : "",
      )}
      onClick={() => handleClick(letter)}
    >
      {!isBackspace ? <span>{letter}</span> : <IoBackspaceOutline size={24} />}
    </button>
  );
}

export default KeyboardButton;

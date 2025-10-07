import { twMerge } from "tailwind-merge";
import { submitCurrentGuess, updateCurrentGuess } from "../wordleSlice.js";
import { useDispatch } from "react-redux";
import { IoBackspaceOutline } from "react-icons/io5";

import { themeColors } from "../shared/themeColors.js";

function KeyboardButton({ letter, color, width }) {
  const dispatch = useDispatch();
  const isEnter = letter === "Enter";
  const isBackspace = letter === "Backspace";

  function handleClick() {
    if (!letter) {
      return;
    }

    if (isEnter) {
      dispatch(submitCurrentGuess());
      return;
    }

    dispatch(updateCurrentGuess(letter));
  }

  return (
    <div
      className={twMerge("px-0.5", letter? "cursor-pointer":"cursor-default")}
      style={{width:`${2.75*width}rem`}}
      onClick={() => handleClick(letter)}
    >
      { letter &&
      <button className={twMerge(
        "w-full flex items-center justify-center bg-button text-font dark:bg-button-dark dark:text-font-dark font-bold uppercase rounded-sm text-xl h-full",
        isEnter ? "text-xs" : "",
        color ? themeColors[color] : ""
      )}>
        {!isBackspace ? <span>{letter}</span> : <IoBackspaceOutline size={24} />}
      </button>
      }
    </div>
  );
}

export default KeyboardButton;

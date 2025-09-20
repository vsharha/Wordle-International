import { twMerge } from "tailwind-merge";
import { themeColors } from "../shared/themeColors.js";
import useMessage from "../shared/useMessage.js";

function DisplayLetter({ letter, color }) {
  const { isVisible } = useMessage();

  return (
    <span
      className={twMerge(
        "uppercase flex items-center justify-center aspect-square h-full border-2 border-border font-bold dark:border-border-dark text-3xl text-font dark:text-font-dark",
        letter ? "border-border-letter dark:border-border-letter-dark" : "",
        color ? themeColors[color] : "",
      )}
    >
      {letter}
    </span>
  );
}

export default DisplayLetter;

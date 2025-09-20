import { twMerge } from "tailwind-merge";
import useMessage from "../shared/useMessage.js";

function Message() {
  const { isVisible, message, handleTransitionEnd } = useMessage();

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={twMerge(
        "absolute top-1 m-auto right-0 left-0 w-fit bg-font text-font-dark dark:bg-font-dark dark:text-font uppercase font-bold rounded-sm p-3 pt-2 text-sm transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {message}
    </div>
  );
}

export default Message;

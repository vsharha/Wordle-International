import useFadeIn from "../animation/useFadeIn.js";
import { twMerge } from "tailwind-merge";

function Modal({ children, open, onClose }) {
  const { visible, onFadeInEnd } = useFadeIn(open);

  if (!visible) return null;

  return (
    <div
      className={twMerge(
        "fixed bg-black/10 dark:bg-black/50 w-screen h-screen-dynamic z-20 top-0 right-0 flex items-center justify-center",
        visible ? "animate-fade-in" : "",
      )}
      onClick={onClose}
      onAnimationEnd={onFadeInEnd}
    >
      <div
        className="absolute bottom-0 w-full md:w-150 md:bottom-1/2 shadow-xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;

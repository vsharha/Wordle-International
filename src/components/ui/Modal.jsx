"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import useFadeIn from "@/hooks/animation/useFadeIn.js";
import { setKeyboardDisabled } from "@/slices/wordleSlice.js";

function Modal({ children, open, onClose }) {
  const { visible, onFadeInEnd } = useFadeIn(open);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setKeyboardDisabled(open));
  }, [open, dispatch]);

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
        className="absolute bottom-0 w-full md:w-150 md:top-0 md:my-auto h-fit shadow-xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;

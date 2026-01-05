"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { getStatus, resetGame, startGame } from "@/slices/wordleSlice.js";
import useFadeIn from "@/hooks/animation/useFadeIn.js";

function RestartButton() {
  const [open, setOpen] = useState();

  const status = useSelector(getStatus);

  useEffect(() => {
    if (status !== "playing") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [status]);

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(resetGame());
    dispatch(startGame());
  }

  const { visible, onFadeInEnd } = useFadeIn(open);

  if (!open) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "backdrop-blur-xs absolute bottom-0 w-full h-full flex justify-center items-center",
        visible ? "animate-fade-in" : "",
      )}
      onAnimationEnd={onFadeInEnd}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="uppercase text-2xl font-bold border-2 border-black w-fit p-5 rounded-lg cursor-pointer bg-back dark:bg-back-dark mb-15"
        onClick={handleClick}
      >
        Restart
      </button>
    </div>
  );
}

export default RestartButton;

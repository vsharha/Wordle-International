"use client";

import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuesses, setKeyboardDisabled } from "@/slices/wordleSlice.js";

export default function useRotate(word, wordIndex) {
  const [rotateIndex, setRotateIndex] = useState(null);

  const dispatch = useDispatch();

  const guesses = useSelector(getGuesses);

  useLayoutEffect(() => {
    if (guesses.length !== 0 && wordIndex === guesses.length - 1) {
      dispatch(setKeyboardDisabled(true));
      setRotateIndex(0);
    }
  }, [wordIndex, guesses.length, dispatch]);

  function onRotateEnd() {
    setRotateIndex((i) => {
      if (i < word.length - 1) return i + 1;
      else {
        dispatch(setKeyboardDisabled(false));
        return null;
      }
    });
  }

  return { rotateIndex, setRotateIndex, onRotateEnd };
}

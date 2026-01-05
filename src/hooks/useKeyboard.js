"use client"

import { useEffect, useMemo } from "react";
import { getLanguage, submitCurrentGuess, updateCurrentGuess } from "@/slices/wordleSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getFlattenedLayout } from "@/components/keyboard/getKeyboardLayout.js";

export default function useKeyboard() {
    const dispatch = useDispatch();

    const language = useSelector(getLanguage)

    const keys = useMemo(()=>getFlattenedLayout(language), [language])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.defaultPrevented) return;

            switch (e.key) {
                case "Enter":
                    dispatch(submitCurrentGuess());
                    break;
                case "Backspace":
                    dispatch(updateCurrentGuess(e.key));
                    break;
                default:
                    if (e.key.length === 1 && keys.includes(e.key.toLowerCase())) {
                        dispatch(updateCurrentGuess(e.key.toLowerCase()));
                        e.preventDefault();
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, keys]);
}

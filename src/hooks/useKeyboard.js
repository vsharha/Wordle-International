import { useEffect } from "react";
import { submitCurrentGuess, updateCurrentGuess } from "../wordleSlice.js";
import { useDispatch } from "react-redux";

export default function useKeyboard() {
    const dispatch = useDispatch();

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
                    if (e.key.length === 1 && e.key.match(/[a-z]/i))
                        dispatch(updateCurrentGuess(e.key.toLowerCase()));
                    else {
                        e.preventDefault();
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);
}

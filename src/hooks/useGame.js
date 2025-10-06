import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    getLanguage,
    getMaxAttempts,
    getWordLength,
    setLanguage,
    setMaxAttempts,
    setWordLength, startGameAndFetch,
} from "../wordleSlice.js";
import useKeyboard from "./useKeyboard.js";

export default function useGame() {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const wordLength = searchParams.get("len")
        const maxAttempts = searchParams.get("ma")
        const language = searchParams.get("lang")

        if (wordLength) {
            dispatch(setWordLength(Number(wordLength)))
        }

        if (maxAttempts) {
            dispatch(setMaxAttempts(Number(maxAttempts)))
        }

        if (language) {
            dispatch(setLanguage(language))
        }
    }, []);

    const wordLength = useSelector(getWordLength)
    const maxAttempts = useSelector(getMaxAttempts)
    const language = useSelector(getLanguage)

    useEffect(()=>{
        setSearchParams({len:wordLength, ma:maxAttempts, lang:language})
    },[wordLength, maxAttempts, language, setSearchParams])

    useEffect(() => {
        dispatch(startGameAndFetch())
    }, [dispatch]);

    useKeyboard();
}
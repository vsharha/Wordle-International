"use client"

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {
    getLanguage,
    getMaxAttempts,
    getWordLength,
    setLanguage,
    setMaxAttempts,
    setWordLength, startGameAndFetch,
} from "@/slices/wordleSlice.js";
import useKeyboard from "@/hooks/useKeyboard.js";

export default function useGame() {
    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

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
    });

    const wordLength = useSelector(getWordLength)
    const maxAttempts = useSelector(getMaxAttempts)
    const language = useSelector(getLanguage)

    useEffect(()=>{
        const params = new URLSearchParams(searchParams.toString());
        params.set("len", wordLength);
        params.set("ma", maxAttempts);
        params.set("lang", language);
        router.push(`${pathname}?${params.toString()}`)
    }, [wordLength, maxAttempts, language, pathname, router, searchParams])

    useEffect(() => {
        dispatch(startGameAndFetch())
    }, [dispatch]);

    useKeyboard();
}
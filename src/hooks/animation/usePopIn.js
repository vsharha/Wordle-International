"use client"

import { useRef, useLayoutEffect, useState } from "react";

export default function usePopIn(word, isCurrent) {
    const [popInIndex, setPopInIndex] = useState(null);
    const prevLengthRef = useRef(word.length);

    useLayoutEffect(() => {
        if (isCurrent && word.length > prevLengthRef.current) {
            const index = word.length - 1;
            if (word.at(index)) {
                setPopInIndex(index);
            }
        }
        prevLengthRef.current = word.length;
    }, [isCurrent, word]);

    return { popInIndex };
}

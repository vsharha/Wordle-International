import { useEffect, useRef, useState } from "react";

export default function usePopIn(word, isCurrent) {
    const [popInIndex, setPopInIndex] = useState(null);
    const prevLengthRef = useRef(word.length);

    useEffect(() => {
        if (isCurrent) {
            if (word.length > prevLengthRef.current) {
                const index = word.length - 1;
                if (isCurrent && word.at(index)) {
                    setPopInIndex(index);
                }
            }
            prevLengthRef.current = word.length;
        }
    }, [isCurrent, word]);

    return { popInIndex };
}

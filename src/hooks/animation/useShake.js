"use client"

import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { getMessage } from "@/slices/wordleSlice.js";

export default function useShake(isCurrent) {
    const reduxMessage = useSelector(getMessage);

    const [shake, setShake] = useState(false);

    useLayoutEffect(() => {
        if (reduxMessage.message && reduxMessage.type === "error" && isCurrent) {
            setShake(true);
        }
    }, [reduxMessage, isCurrent]);

    function onShakeEnd() {
        setShake(false);
    }

    return { shake, onShakeEnd };
}

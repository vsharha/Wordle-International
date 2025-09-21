import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMessage, getMessageType } from "../wordleSlice.js";

export default function useShake(isCurrent) {
    const reduxMessage = useSelector(getMessage);
    const reduxMessageType = useSelector(getMessageType);

    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (reduxMessage && reduxMessageType === "error" && isCurrent) {
            setShake(true);
        }
    }, [reduxMessage, reduxMessageType, isCurrent]);

    function onShakeEnd() {
        setShake(false);
    }

    return { shake, onShakeEnd };
}

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMessage } from "../wordleSlice.js";

export default function useShake(isCurrent) {
    const reduxMessage = useSelector(getMessage);

    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (reduxMessage.message && reduxMessage.type === "error" && isCurrent) {
            setShake(true);
        }
    }, [reduxMessage, isCurrent]);

    function onShakeEnd() {
        setShake(false);
    }

    return { shake, onShakeEnd };
}

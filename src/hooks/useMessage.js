import { useEffect, useState } from "react";
import { clearMessage, getMessage, getMessageType, getStatus } from "../wordleSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function useMessage() {
    const reduxMessage = useSelector(getMessage);
    const reduxMessageType = useSelector(getMessageType);
    const status = useSelector(getStatus);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const [isVisible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (reduxMessage) {
            setMessage(reduxMessage);
            setIsVisible(true);
            dispatch(clearMessage());
        }
        if (reduxMessageType) {
            setMessageType(reduxMessageType);
        }
    }, [reduxMessage, reduxMessageType, dispatch, status]);

    function handleTransitionEnd() {
        if (isVisible && status === "playing") {
            const timeout = setTimeout(() => setIsVisible(false), 1000);

            return () => clearTimeout(timeout);
        }
    }

    return { isVisible, message, messageType, handleTransitionEnd };
}

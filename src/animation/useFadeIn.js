import { useEffect, useState } from "react";

export default function useFadeIn(open) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [open]);

    function onFadeInEnd() {
        if (!open) setVisible(false);
    }

    return { visible, onFadeInEnd };
}

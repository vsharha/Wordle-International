"use client"

import { useState } from "react";

export default function useFadeIn(open) {
    const [visible, setVisible] = useState(open);

    function onFadeInEnd() {
        if (!open) setVisible(false);
    }

    return { visible, onFadeInEnd };
}

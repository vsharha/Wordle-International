import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode, setDarkMode } from "../wordleSlice.js";

export default function useDarkmode() {
    const dispatch = useDispatch();

    const isDark = useSelector(getIsDarkMode);
    const setIsDark = (v) => dispatch(setDarkMode(v));

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    return { isDark, setIsDark };
}

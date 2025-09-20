import Toggle from "./Toggle.jsx";
import useDarkmode from "../shared/useDarkmode.js";
import Range from "./Range.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMaxAttempts, getWordLength, setMaxAttempts, setWordLength } from "../wordleSlice.js";

function Settings({ open }) {
  const { isDark, setIsDark } = useDarkmode();

  const dispatch = useDispatch();

  const wordLength = useSelector(getWordLength);

  const maxAttempts = useSelector(getMaxAttempts);

  return (
    <dialog
      open={open}
      className="inset-0 m-auto bg-back z-10 dark:bg-back-dark text-font dark:text-font-dark w-[min(100vw, 50rem)] p-3 rounded-lg"
    >
      <h2 className="font-bold uppercase text-center">Settings</h2>
      <Toggle value={isDark} setValue={setIsDark}>
        Dark Theme
      </Toggle>
      <Range min={2} max={8} value={wordLength} setValue={(v) => dispatch(setWordLength(v))}>
        Word length
      </Range>
      <Range min={4} max={8} value={maxAttempts} setValue={(v) => dispatch(setMaxAttempts(v))}>
        Max attempts
      </Range>
    </dialog>
  );
}

export default Settings;

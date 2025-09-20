import Toggle from "./Toggle.jsx";
import useDarkmode from "../shared/useDarkmode.js";
import Range from "./Range.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMaxAttempts, getWordLength, setMaxAttempts, setWordLength } from "../wordleSlice.js";
import Modal from "../ui/Modal.jsx";

function Settings({ open, setIsOpen }) {
  const { isDark, setIsDark } = useDarkmode();

  const dispatch = useDispatch();

  const wordLength = useSelector(getWordLength);

  const maxAttempts = useSelector(getMaxAttempts);

  return (
    <Modal open={open} onClose={() => setIsOpen(false)}>
      <div
        className="inset-0 m-auto bg-back z-10 dark:bg-back-dark text-font dark:text-font-dark p-3 rounded-lg w-1/2 shadow-xl w-9/10 md:w-150"
        onClick={(e) => e.stopPropagation()}
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
      </div>
    </Modal>
  );
}

export default Settings;

import Toggle from "./Toggle.jsx";
import useDarkmode from "../shared/useDarkmode.js";
import Range from "./Range.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaxAttempts,
  getWordLength,
  updateMaxAttempts,
  updateWordLength,
} from "../wordleSlice.js";
import Modal from "../ui/Modal.jsx";
import { RxCross2 } from "react-icons/rx";

function Settings({ open, setIsOpen }) {
  const { isDark, setIsDark } = useDarkmode();

  const dispatch = useDispatch();

  const wordLength = useSelector(getWordLength);

  const maxAttempts = useSelector(getMaxAttempts);

  return (
    <Modal open={open} onClose={() => setIsOpen(false)}>
      <div className="bg-back dark:bg-back-dark text-font dark:text-font-dark p-3 rounded-lg w-full">
        <div className="relative flex items-center justify-center pb-7">
          <h2 className="font-bold uppercase text-center">Settings</h2>
          <button onClick={() => setIsOpen(false)} className="absolute right-2 top-2">
            <RxCross2 size={24} />
          </button>
        </div>

        <Toggle value={isDark} setValue={setIsDark}>
          Dark Theme
        </Toggle>
        <Range min={2} max={8} value={wordLength} setValue={(v) => dispatch(updateWordLength(v))}>
          Word length
        </Range>
        <Range min={4} max={8} value={maxAttempts} setValue={(v) => dispatch(updateMaxAttempts(v))}>
          Max attempts
        </Range>
      </div>
    </Modal>
  );
}

export default Settings;

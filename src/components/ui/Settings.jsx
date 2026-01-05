import { useDispatch, useSelector } from "react-redux";
import Toggle from "@/components/header/Toggle.jsx";
import useDarkmode from "@/hooks/useDarkmode.js";
import Range from "@/components/header/Range.jsx";
import {
  getMaxAttempts,
  getWordLength,
  updateMaxAttempts,
  updateWordLength,
} from "@/slices/wordleSlice.js";
import Modal from "@/components/ui/Modal.jsx";
import CloseButton from "@/components/ui/CloseButton.jsx";

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
          <CloseButton onClose={() => setIsOpen(false)} />
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

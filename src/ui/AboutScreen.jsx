import Modal from "./Modal.jsx";
import CloseButton from "./CloseButton.jsx";
import { useSelector } from "react-redux";
import { getMaxAttempts, getWordLength } from "../wordleSlice.js";
import DisplayWord from "../display/DisplayWord.jsx";

function AboutScreen({open, setIsOpen}) {
  const wordLength = useSelector(getWordLength)
  const maxAttempts = useSelector(getMaxAttempts)

  return (
    <Modal open={open} onClose={()=>setIsOpen(false)}>
      <div className= "text-font dark:text-font-dark bg-back dark:bg-back-dark rounded-lg p-3">
        <div className="relative">
          <div className="h-10"></div>
          <CloseButton onClose={() => setIsOpen(false)} />
        </div>
        <div className="p-2 md:p-7">
          <h1 className="font-bold text-3xl font-serif">How To Play</h1>
          <h2 className="text-lg">Guess the Wordle in {maxAttempts} tries</h2>
          <ul className="list-disc pl-5 mt-3">
            <li>
              Each guess must be a valid {wordLength}-letter word.
            </li>
            <li>
              The color of the tiles will change to show how close your guess was to the word.
            </li>
          </ul>
          <p className="font-bold mt-3">Examples</p>
          <DisplayWord word="wordy" skipArray={["correct"]} className="justify-start mt-3" skipWordLen={5}/>
          <p><span className="font-bold">W</span> is in the word and in the correct spot.</p>
          <DisplayWord word="light" skipArray={["", "present"]} className="justify-start mt-3" skipWordLen={5}/>
          <p><span className="font-bold">I</span> is in the word but in the wrong spot.</p>
          <DisplayWord word="rogue" skipArray={["", "", "", "guessed"]} className="justify-start mt-3" skipWordLen={5}/>
          <p><span className="font-bold">U</span> is not in the word in any spot.</p>
        </div>
      </div>
    </Modal>
  );
}

export default AboutScreen;
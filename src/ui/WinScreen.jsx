import DisplayWord from "../display/DisplayWord.jsx";
import { useSelector } from "react-redux";
import { getStatus, getWordToGuess } from "../wordleSlice.js";
import CloseButton from "./CloseButton.jsx";

function WinScreen() {
  const wordToGuess = useSelector(getWordToGuess);
  const status = useSelector(getStatus);

  return (
    <div className="text-font dark:text-font-dark bg-back dark:bg-back-dark p-3 rounded-lg">
      <div className="relative">
        <h1 className="font-bold text-center pb-4 text-2xl">Congratulations!</h1>
        <CloseButton />
      </div>
      <DisplayWord word={status === "won" ? wordToGuess : ""} skip={true} />
    </div>
  );
}

export default WinScreen;

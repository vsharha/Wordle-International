import { useSelector } from "react-redux";
import { getCurrentGuess, getGuesses, getMaxAttempts, getStatus } from "../wordleSlice.js";
import DisplayWord from "./DisplayWord.jsx";

function Display() {
  const currentGuess = useSelector(getCurrentGuess);

  const maxAttempts = useSelector(getMaxAttempts);

  const status = useSelector(getStatus);

  function getNormalisedArray(array) {
    if (status === "lost") return array;

    let result = [...array, currentGuess];

    for (let i = 0; i <= maxAttempts - array.length - 2; i++) {
      result.push("");
    }
    return result;
  }

  const guesses = useSelector(getGuesses);

  const normalised = getNormalisedArray(guesses);

  return (
    <div className="flex flex-col gap-1.5 w-full justify-center">
      {normalised.map((guess, i) => (
        <DisplayWord word={guess} key={i} wordIndex={i} />
      ))}
    </div>
  );
}

export default Display;

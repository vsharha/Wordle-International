import { useSelector } from "react-redux";
import {getCurrentGuess, getGuesses, getMaxAttempts, getStatus} from "@/slices/wordleSlice";
import GraphemeSplitter from "grapheme-splitter";
import {ToasterWithMax} from "@/hooks/useMaxToasts";
import DisplayWord from "@/components/display/DisplayWord";

function Display() {
  const currentGuess = useSelector(getCurrentGuess);

  const maxAttempts = useSelector(getMaxAttempts);

  const status = useSelector(getStatus);

  let splitter = new GraphemeSplitter()

  function getNormalisedArray(array) {
    if (status === "lost") return array;

    let result = [...array, currentGuess].map((guess) => splitter.splitGraphemes(guess))

    for (let i = 0; i <= maxAttempts - array.length - 2; i++) {
      result.push("");
    }

    return result;
  }

  const guesses = useSelector(getGuesses);

  const normalised = getNormalisedArray(guesses);

  return (
    <div className="flex flex-col w-full gap-1.5 justify-center h-full md:h-fit relative p-2 md:p-8">
      <ToasterWithMax max={3} position="top-center" toastOptions={{duration:1500}} containerStyle={{position:"absolute", zIndex:5 }} />
      {normalised.map((guess, i) => (
        <DisplayWord word={guess} key={i} wordIndex={i} />
      ))}
    </div>
  );
}

export default Display;

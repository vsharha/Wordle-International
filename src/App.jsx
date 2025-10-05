import Keyboard from "./keyboard/Keyboard.jsx";
import Display from "./display/Display.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getLanguage,
  getMaxAttempts,
  getStatus,
  getWordLength,
  setLanguage,
  setMaxAttempts,
  setWordLength,
  startGameAndFetch,
} from "./wordleSlice.js";
import Header from "./header/Header.jsx";
import WinScreen from "./ui/WinScreen.jsx";
import useKeyboard from "./hooks/useKeyboard.js";
import { useSearchParams } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const wordLength = searchParams.get("len")
    const maxAttempts = searchParams.get("ma")
    const language = searchParams.get("lang")

    if (wordLength) {
      dispatch(setWordLength(Number(wordLength)))
    }

    if (maxAttempts) {
      dispatch(setMaxAttempts(Number(maxAttempts)))
    }

    if (language) {
      dispatch(setLanguage(language))
    }
  }, [searchParams, dispatch]);

  const wordLength = useSelector(getWordLength)
  const maxAttempts = useSelector(getMaxAttempts)
  const language = useSelector(getLanguage)

  useEffect(()=>{
    setSearchParams({len:wordLength, ma:maxAttempts, lang:language})
  },[wordLength, maxAttempts, language, setSearchParams])

  useEffect(() => {
    dispatch(startGameAndFetch())
  }, [dispatch]);

  useKeyboard();

  const status = useSelector(getStatus);

  const [isOpenWinScreen, setIsOpenWinScreen] = useState(false);

  useEffect(() => {
    if (status === "won") setIsOpenWinScreen(true);
  }, [status]);

  return (
    <main className="flex flex-col h-screen-dynamic">
      <Header />
      <div className="flex flex-col h-full">
        <Display />
        <Keyboard />
      </div>
      <WinScreen open={isOpenWinScreen} setIsOpen={setIsOpenWinScreen} />
    </main>
  );
}

export default App;

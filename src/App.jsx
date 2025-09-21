import Keyboard from "./keyboard/Keyboard.jsx";
import Display from "./display/Display.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getStatus,
  getWordToGuess,
  startGame,
  submitCurrentGuess,
  updateCurrentGuess,
} from "./wordleSlice.js";
import Header from "./header/Header.jsx";
import Modal from "./ui/Modal.jsx";
import WinScreen from "./ui/WinScreen.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented) return;

      switch (e.key) {
        case "Enter":
          dispatch(submitCurrentGuess());
          break;
        case "Backspace":
          dispatch(updateCurrentGuess(e.key));
          break;
        default:
          if (e.key.length === 1 && e.key.match(/[a-z]/i))
            dispatch(updateCurrentGuess(e.key.toLowerCase()));
          else {
            e.preventDefault();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const status = useSelector(getStatus);

  const [isOpenWinScreen, setIsOpenWinScreen] = useState(false);

  useEffect(() => {
    if (status === "won") setIsOpenWinScreen(true);
  }, [status]);

  return (
    <main className="flex flex-col justify-center items-center gap-3 h-screen-dynamic md:h-fit">
      <Header />
      <div className="flex flex-col gap-3 h-full justify-between md:h-fit">
        <Display />
        <Keyboard />
      </div>
      <Modal open={isOpenWinScreen} onClose={() => setIsOpenWinScreen(false)}>
        <WinScreen />
      </Modal>
    </main>
  );
}

export default App;

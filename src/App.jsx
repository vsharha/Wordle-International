import Keyboard from "./keyboard/Keyboard.jsx";
import Display from "./display/Display.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startGame, submitCurrentGuess, updateCurrentGuess } from "./wordleSlice.js";
import Message from "./ui/Message.jsx";
import Header from "./header/Header.jsx";

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

  return (
    <main className="flex flex-col justify-center items-center gap-3">
      <Header />
      <div className="flex flex-col gap-3 relative">
        <Message />
        <Display />
        <Keyboard />
      </div>
    </main>
  );
}

export default App;

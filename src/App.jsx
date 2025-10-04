import Keyboard from "./keyboard/Keyboard.jsx";
import Display from "./display/Display.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStatus, startGame } from "./wordleSlice.js";
import Header from "./header/Header.jsx";
import Modal from "./ui/Modal.jsx";
import WinScreen from "./ui/WinScreen.jsx";
import useKeyboard from "./hooks/useKeyboard.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGame());
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

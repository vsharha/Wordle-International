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
import useGame from "./hooks/useGame.js";
import RestartButton from "./ui/RestartButton.jsx";

function App() {
  useGame();

  return (
    <main className="flex flex-col h-screen-dynamic">
      <Header />
      <div className="flex flex-col h-full">
        <Display />
        <div className="h-75 relative">
          <Keyboard />
          <RestartButton />
        </div>
      </div>
      <WinScreen/>
    </main>
  );
}

export default App;

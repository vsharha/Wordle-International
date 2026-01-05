"use client";

import useGame from "@/hooks/useGame";
import Header from "@/components/header/Header";
import Display from "@/components/display/Display";
import Keyboard from "@/components/keyboard/Keyboard";
import RestartButton from "@/components/ui/RestartButton";
import WinScreen from "@/components/ui/WinScreen";

export default function Home() {
  useGame();

  return (
    <main className="flex flex-col h-screen-dynamic">
      <Header />
      <div className="flex flex-col h-full">
        <div className="flex-1 md:flex-none z-5">
          <Display />
        </div>
        <div className="h-50 relative z-4 py-2">
          <Keyboard />
          <RestartButton />
        </div>
      </div>
      <WinScreen/>
    </main>
  );
}

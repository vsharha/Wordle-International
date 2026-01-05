"use client";

import { useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import HeaderButton from "@/components/header/HeaderButton";
import LanguageSelector from "@/components/header/LanguageSelector";
import DarkmodeButton from "@/components/ui/DarkmodeButton";
import SettingsButton from "@/components/ui/SettingsButton";
import AboutScreen from "@/components/ui/AboutScreen";

function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="border-b-1 w-screen border-border dark:border-border-dark flex items-center justify-between h-12 md:px-2">
      <HeaderButton
        onClick={() => setIsAboutOpen((open) => !open)}
        className="aspect-square"
      >
        <FaRegCircleQuestion size={20} />
      </HeaderButton>
      <div className="flex flex-row items-center justify-center h-full">
        <LanguageSelector />
        <DarkmodeButton />
        <SettingsButton />
      </div>
      <AboutScreen open={isAboutOpen} setIsOpen={setIsAboutOpen}></AboutScreen>
    </header>
  );
}

export default Header;

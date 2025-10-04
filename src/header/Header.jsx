import HeaderButton from "./HeaderButton.jsx";
import { useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import AboutScreen from "../ui/AboutScreen.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import SettingsButton from "../ui/SettingsButton.jsx";
import DarkmodeButton from "../ui/DarkmodeButton.jsx";

function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="border-b-1 w-screen border-border dark:border-border-dark flex items-center justify-between h-12 md:px-2">
      <HeaderButton onClick={()=>setIsAboutOpen((open) => !open)}>
        <FaRegCircleQuestion size={20} />
      </HeaderButton>
      <div className="flex items-center justify-center h-full">
        <LanguageSelector />
        <DarkmodeButton />
        <SettingsButton />
      </div>
      <AboutScreen open={isAboutOpen} setIsOpen={setIsAboutOpen}></AboutScreen>
    </header>
  );
}

export default Header;

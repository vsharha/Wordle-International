import { IoMdSettings } from "react-icons/io";
import HeaderButton from "./HeaderButton.jsx";
import Settings from "../ui/Settings.jsx";
import { useState } from "react";
import { FaMoon, FaRegCircleQuestion, FaSun } from "react-icons/fa6";
import useDarkmode from "../hooks/useDarkmode.js";
import AboutScreen from "../ui/AboutScreen.jsx";
import LanguageSelector from "./LanguageSelector.jsx";

function Header() {
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { isDark, setIsDark } = useDarkmode();

  return (
    <header className="border-b-1 w-screen border-border dark:border-border-dark flex items-center justify-between h-12 md:px-2">
      <HeaderButton onClick={()=>setIsAboutOpen((open) => !open)}>
        <FaRegCircleQuestion size={20} />
      </HeaderButton>
      <div className="flex items-center justify-center h-full">
        <LanguageSelector/>
        <HeaderButton onClick={() => setIsDark(!isDark)}>
          {isDark ? <FaMoon size={24} /> : <FaSun size={24} />}
        </HeaderButton>
        <HeaderButton onClick={() => setAreSettingsOpen((open) => !open)}>
          <IoMdSettings size={35}  />
        </HeaderButton>
      </div>
      <Settings open={areSettingsOpen} setIsOpen={setAreSettingsOpen} />
      <AboutScreen open={isAboutOpen} setIsOpen={setIsAboutOpen}></AboutScreen>
    </header>
  );
}

export default Header;

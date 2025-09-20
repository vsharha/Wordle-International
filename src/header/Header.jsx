import { IoMdSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderButton from "./HeaderButton.jsx";
import Settings from "./Settings.jsx";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import useDarkmode from "../shared/useDarkmode.js";

function Header() {
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const { isDark, setIsDark } = useDarkmode();

  return (
    <header className="border-b-1 w-screen border-border dark:border-border-dark flex items-center justify-between h-12 px-2">
      <HeaderButton>
        <GiHamburgerMenu size={20} />
      </HeaderButton>
      <div className="flex items-center justify-center h-full">
        <HeaderButton onClick={() => setIsDark(!isDark)}>
          {isDark ? <FaMoon size={24} /> : <FaSun size={24} />}
        </HeaderButton>
        <HeaderButton>
          <IoMdSettings size={35} onClick={() => setAreSettingsOpen((open) => !open)} />
        </HeaderButton>
      </div>
      <Settings open={areSettingsOpen} />
    </header>
  );
}

export default Header;

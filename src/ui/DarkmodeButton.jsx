import HeaderButton from "../header/HeaderButton.jsx";
import { FaMoon, FaSun } from "react-icons/fa6";
import useDarkmode from "../hooks/useDarkmode.js";

function DarkmodeButton() {
  const { isDark, setIsDark } = useDarkmode();

  return (
    <HeaderButton onClick={() => setIsDark(!isDark)}>
      {isDark ? <FaMoon size={24} /> : <FaSun size={24} />}
    </HeaderButton>
  );
}

export default DarkmodeButton;
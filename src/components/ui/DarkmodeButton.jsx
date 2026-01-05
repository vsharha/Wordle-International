import { FaMoon, FaSun } from "react-icons/fa6";
import HeaderButton from "@/components/header/HeaderButton.jsx";
import useDarkmode from "@/hooks/useDarkmode.js";

function DarkmodeButton() {
  const { isDark, setIsDark } = useDarkmode();

  return (
    <HeaderButton onClick={() => setIsDark(!isDark)}>
      {isDark ? <FaMoon size={24} /> : <FaSun size={24} />}
    </HeaderButton>
  );
}

export default DarkmodeButton;

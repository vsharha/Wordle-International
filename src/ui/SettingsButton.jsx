import { useState } from "react";
import HeaderButton from "../header/HeaderButton.jsx";
import { IoMdSettings } from "react-icons/io";
import Settings from "./Settings.jsx";

function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderButton onClick={() => setIsOpen((open) => !open)}>
        <IoMdSettings size={35}  />
      </HeaderButton>
      <Settings open={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default SettingsButton;
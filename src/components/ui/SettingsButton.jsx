import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import HeaderButton from "@/components/header/HeaderButton.jsx";
import Settings from "@/components/ui/Settings.jsx";

function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderButton onClick={() => setIsOpen((open) => !open)}>
        <IoMdSettings size={35} />
      </HeaderButton>
      <Settings open={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default SettingsButton;

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage, updateLanguage } from "../wordleSlice.js";
import { keyboardLayouts } from "../keyboard/getKeyboardLayout.js";
import HeaderButton from "./HeaderButton.jsx";
import { FaGlobe } from "react-icons/fa6";
import Dropdown from "../ui/Dropdown.jsx";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const language = useSelector(getLanguage)

  const ref = useRef(null)

  return (
    <div className="relative text-font dark:text-font-dark h-full">
      <HeaderButton className="px-4 font-semibold" ref={ref} onClick={() => setIsOpen((isOpen)=>!isOpen)}>
        <FaGlobe size={16}/>
        <span>
          {capitalize(language)}
        </span>
      </HeaderButton>
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} buttonRef={ref}>
        <Options />
      </Dropdown>
    </div>
  );
}

function Options() {
  const dispatch = useDispatch();

  return <div className="absolute -right-2 mt-2 z-10 rounded-sm overflow-hidden border-1 border-border dark:border-border-dark">
    <div className="flex flex-col w-fit bg-back-secondary dark:bg-back-secondary-dark h-[50dvh] overflow-y-scroll scrollbar scrollbar-thin dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-back-dark" >
      {Object.keys(keyboardLayouts).map((language) =>
        <button className="w-full flex hover:brightness-90 bg-back-secondary dark:bg-back-secondary-dark px-2 py-1 pr-6" onClick={()=>dispatch(updateLanguage(language))} key={language}>
          {capitalize(language)}
        </button>
      )}
    </div>
  </div>
}
export default LanguageSelector;
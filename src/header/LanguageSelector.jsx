import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../wordleSlice.js";
import useFadeIn from "../animation/useFadeIn.js";
import { twMerge } from "tailwind-merge";
import { keyboardLayouts } from "../keyboard/getKeyboardLayout.js";
import HeaderButton from "./HeaderButton.jsx";
import { FaGlobe } from "react-icons/fa6";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const language = useSelector(getLanguage)

  return (
    <div className="relative text-font dark:text-font-dark h-full">
      <HeaderButton className="px-4">
        <FaGlobe size={16}/>
        <Language language={language} onClick={() => setIsOpen((isOpen)=>!isOpen)} className="font-semibold" />
      </HeaderButton>
      <Options open={isOpen}/>
    </div>
  );
}

function Options({ open }) {
  const { visible, onFadeInEnd } = useFadeIn(open);

  const dispatch = useDispatch();

  if (!visible) return null;

  return <div className={twMerge("absolute -right-2 mt-2 z-10 rounded-sm overflow-hidden border-1 border-border dark:border-border-dark ", visible ? "animate-fade-in" : "",)}>
    <div className="flex flex-col w-fit bg-back-secondary dark:bg-back-secondary-dark h-[50dvh] overflow-y-scroll scrollbar scrollbar-thin dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-back-dark" onAnimationEnd={onFadeInEnd}>
      {Object.keys(keyboardLayouts).map((language) =>
        <button className="w-full flex hover:brightness-90 bg-back-secondary dark:bg-back-secondary-dark px-2 py-1 pr-6" onClick={()=>dispatch(setLanguage(language))} key={language}>
          <Language language={language}/>
        </button>
      )}
    </div>
  </div>
}

function Language({ language, className, onClick }) {
  return <div>
    <span className={twMerge("text-left w-full", className)} onClick={onClick}>
      {capitalize(language)}
    </span>
  </div>
}

export default LanguageSelector;
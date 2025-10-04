import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../wordleSlice.js";
import useFadeIn from "../animation/useFadeIn.js";
import { twMerge } from "tailwind-merge";
import { keyboardLayouts } from "../keyboard/getKeyboardLayout.js";
import HeaderButton from "./HeaderButton.jsx";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(true)
  const language = useSelector(getLanguage)

  return (
    <div className="relative text-font dark:text-font-dark h-full">
      <HeaderButton>
        <Language language={language} onClick={() => setIsOpen((isOpen)=>!isOpen)} className="px-3" />
      </HeaderButton>
      <Options open={isOpen}/>
    </div>
  );
}

function Options({ open }) {
  const { visible, onFadeInEnd } = useFadeIn(open);

  const dispatch = useDispatch();

  if (!visible) return null;

  return <div className={twMerge("absolute flex flex-col z-10 -right-2 mt-2 w-fit border-1 border-border dark:border-border-dark rounded-sm overflow-hidden bg-back-secondary dark:bg-back-secondary-dark h-[50dvh] overflow-y-scroll", visible ? "animate-fade-in" : "",)} onAnimationEnd={onFadeInEnd}>
    {Object.keys(keyboardLayouts).map((language) =>
      <button className="w-full flex hover:brightness-90 bg-back-secondary dark:bg-back-secondary-dark px-2 py-1 pr-6" onClick={()=>dispatch(setLanguage(language))} key={language}>
        <Language language={language}/>
      </button>
    )}
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
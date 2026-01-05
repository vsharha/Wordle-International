import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguageList,
  getLanguage,
  getLanguageList,
  getLanguageLoadingStatus,
  updateLanguage,
} from "@/slices/wordleSlice.js";
import { languageCodeMapping } from "@/components/keyboard/getKeyboardLayout.js";
import HeaderButton from "@/components/header/HeaderButton.jsx";
import { FaCheck, FaChevronDown, FaGlobe } from "react-icons/fa6";
import Dropdown from "@/components/ui/Dropdown.jsx";
import Loader from "@/components/ui/Loader.jsx";
import { twMerge } from "tailwind-merge";

const capitalize = (str) =>
  typeof str == "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const language = useSelector(getLanguage);

  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchLanguageList());
    }
  }, [isOpen, dispatch]);

  return (
    <div className="relative text-font dark:text-font-dark h-full">
      <HeaderButton
        className="px-4 font-semibold"
        ref={ref}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <FaGlobe size={16} />
        <span>{capitalize(languageCodeMapping[language])}</span>
        <FaChevronDown />
      </HeaderButton>
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} buttonRef={ref}>
        <Options setIsOpen={setIsOpen} />
      </Dropdown>
    </div>
  );
}

function Options({ setIsOpen }) {
  const dispatch = useDispatch();
  const languageList = useSelector(getLanguageList);
  const currentLanguage = useSelector(getLanguage);

  const languageLoadingStatus = useSelector(getLanguageLoadingStatus);

  return (
    <div className="absolute right-2 mt-2 z-10 rounded-sm border-1 border-border dark:border-border-dark overflow-hidden">
      <div className="flex flex-col w-fit bg-back-secondary dark:bg-back-secondary-dark max-h-[50dvh] overflow-auto scrollbar scrollbar-thin dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-back-dark">
        {languageList.map((code) => {
          const language = languageCodeMapping[code];
          const isCurrent = currentLanguage === code;

          return (
            <button
              className={twMerge(
                "w-full flex hover:brightness-90 bg-back-secondary dark:bg-back-secondary-dark px-2 py-1 pr-6 items-center gap-2",
              )}
              onClick={() => {
                setIsOpen(false);

                if (!isCurrent) {
                  dispatch(updateLanguage(code));
                }
              }}
              key={language}
            >
              <span>{capitalize(language)}</span>{" "}
              <span className="w-5 flex items-center justify-center">
                {isCurrent && <FaCheck />}
              </span>
            </button>
          );
        })}
        {languageList.length <= 1 && languageLoadingStatus === "loading" && (
          <div className="flex w-full justify-center p-2">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
export default LanguageSelector;

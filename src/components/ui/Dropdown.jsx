import { useEffect, useRef } from "react";
import useFadeIn from "@/hooks/animation/useFadeIn.js";

function Dropdown({ isOpen, setIsOpen, children, buttonRef }) {
  const ref = useRef(null);

  const { visible, onFadeInEnd } = useFadeIn(isOpen);

  useEffect(() => {
    function handleClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef?.current || !buttonRef.current.contains(event.target))
      )
        setIsOpen((isOpen) => !isOpen);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, setIsOpen, buttonRef]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      onAnimationEnd={onFadeInEnd}
      className={visible ? "animate-fade-in" : ""}
    >
      {children}
    </div>
  );
}

export default Dropdown;

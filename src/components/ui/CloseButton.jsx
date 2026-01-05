import { RxCross2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

function CloseButton({ onClose, className }) {
  return (
    <button
      onClick={onClose}
      className={twMerge(
        "absolute right-2 top-2 text-font dark:text-font-dark cursor-pointer",
        className,
      )}
    >
      <RxCross2 size={24} />
    </button>
  );
}

export default CloseButton;

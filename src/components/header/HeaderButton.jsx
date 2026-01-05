import { twMerge } from "tailwind-merge";

function HeaderButton({ children, onClick, className, ref }) {
  return (
    <button
      ref={ref}
      className={twMerge(
        "h-full bg-back hover:brightness-90 aspect-square flex items-center justify-center dark:bg-back-dark text-font dark:text-font-dark gap-2",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default HeaderButton;

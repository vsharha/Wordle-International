import { twMerge } from "tailwind-merge";

function CustomToast({t, message}) {
  return (
    <div className={twMerge("bg-font text-font-dark dark:bg-font-dark dark:text-font font-bold rounded-sm p-3 pt-2 text-sm z-5 flex items-center justify-center gap-2 transition-opacity duration-300", t.visible ? 'animate-fade-in' : 'opacity-0')}>
      {message}
    </div>
  );
}

export default CustomToast;
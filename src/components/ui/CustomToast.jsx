import { twMerge } from "tailwind-merge";
import Loader from "@/components/ui/Loader.jsx";

function CustomToast({t, message, type}) {
  return (
    <div className={twMerge("bg-font text-font-dark dark:bg-font-dark dark:text-font font-bold rounded-sm p-3 pt-2 text-sm flex items-center justify-center gap-2 transition-opacity duration-300", t.visible ? 'animate-fade-in' : 'opacity-0')}>
      {message} {type==="loading" && <Loader/>}
    </div>
  );
}

export default CustomToast;
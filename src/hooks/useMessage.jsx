import { useEffect, useRef } from "react";
import { clearMessage, getLoadingStatus, getMessage } from "../wordleSlice.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomToast from "../ui/CustomToast.jsx";

export default function useMessage() {
    const reduxMessage = useSelector(getMessage);

    const dispatch = useDispatch();
    const loadingToastId = useRef(null);

    const loadingStatus = useSelector(getLoadingStatus)

    useEffect(() => {
      if (reduxMessage.message && loadingStatus !== "loading") {
        toast.custom(
          (t) => <CustomToast t={t} message={reduxMessage.message} type={reduxMessage.type}/>, reduxMessage.type==="lost"?{duration: Infinity}:null
        );
        dispatch(clearMessage());
      }
    }, [reduxMessage, dispatch, loadingStatus])

    useEffect(()=>{
      if(loadingStatus === "loading") {
        if (!loadingToastId.current) {
          loadingToastId.current = toast.custom(
            (t) => <CustomToast t={t} message={"Loading"} type={"loading"} />, {duration: Infinity}
          );
        }
      } else if (loadingToastId.current && loadingStatus === "idle") {
        setTimeout(()=> {
          if (loadingStatus === "idle") {
            toast.dismiss(loadingToastId.current);
            loadingToastId.current = null;
          }
        }, 500)
      }
    }, [loadingStatus])
}
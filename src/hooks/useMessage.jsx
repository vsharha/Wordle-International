import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, getMessage, getWordLoadingStatus } from "src/components/wordleSlice.js";
import toast from "react-hot-toast";
import CustomToast from "src/components/ui/CustomToast.jsx";

export default function useMessage() {
    const reduxMessage = useSelector(getMessage);

    const dispatch = useDispatch();

    const wordLoadingStatus = useSelector(getWordLoadingStatus)

    useEffect(() => {
      if (reduxMessage.message && wordLoadingStatus !== "loading") {
        toast.custom(
          (t) => <CustomToast t={t} message={reduxMessage.message} type={reduxMessage.type}/>, reduxMessage.type==="lost"?{duration: Infinity}:null
        );
        dispatch(clearMessage());
      }
    }, [reduxMessage, dispatch, wordLoadingStatus])
}
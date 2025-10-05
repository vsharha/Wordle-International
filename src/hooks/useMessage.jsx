import { useEffect } from "react";
import { clearMessage, getMessage } from "../wordleSlice.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomToast from "../ui/CustomToast.jsx";

export default function useMessage() {
    const reduxMessage = useSelector(getMessage);

    const dispatch = useDispatch()

    useEffect(()=>{
        if(reduxMessage.message) {
            toast.custom((t) => <CustomToast t={t} message={reduxMessage.message}/>)
            dispatch(clearMessage())
        }
    },[reduxMessage, dispatch])
}
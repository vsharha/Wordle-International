import React, { useEffect, useRef } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import useMessage from "./useMessage.jsx";
import { useSelector } from "react-redux";
import { getStatus, getWordLoadingStatus } from "../wordleSlice.js";
import CustomToast from "../ui/CustomToast.jsx";

function useMaxToasts(max) {
  const { toasts } = useToasterStore();
  const wordLoadingStatus = useSelector(getWordLoadingStatus);
  const loadingToastId = useRef(null);

  useMessage();

  useEffect(() => {
    toasts
      .filter((t) => t.message !== "loading")
      .filter((t) => t.visible)
      .filter((_, i) => i >= max)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, max]);

  useEffect(() => {
    if (wordLoadingStatus === "loading") {
      if (!loadingToastId.current) {
        loadingToastId.current = toast.custom(
          (t) => <CustomToast t={t} message={"Loading"} type={"loading"} />, { duration: Infinity }
        );
      }
    } else if (loadingToastId.current && wordLoadingStatus !== "loading") {
      setTimeout(() => {
        if (wordLoadingStatus !== "loading") {
          toast.dismiss(loadingToastId.current);
          loadingToastId.current = null;
        }
      }, 300);
    }
  }, [wordLoadingStatus]);

  const status = useSelector(getStatus);

  useEffect(() => {
    if (status === "playing") {
      toast.dismiss();
    }
  }, [status]);
}

export function ToasterWithMax({ max = 10, ...props }) {
  useMaxToasts(max);

  return <Toaster {...props} />;
}
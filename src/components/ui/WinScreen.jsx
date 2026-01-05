"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayWord from "@/components/display/DisplayWord.jsx";
import { getStatus, getWordToGuess } from "@/slices/wordleSlice.js";
import CloseButton from "@/components/ui/CloseButton.jsx";
import Modal from "@/components/ui/Modal.jsx";

function WinScreen() {
  const wordToGuess = useSelector(getWordToGuess);
  const status = useSelector(getStatus);

  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "won") setIsOpen(true);
  }, [status]);

  return (
    <Modal open={open} onClose={() => setIsOpen(false)}>
      <div className="text-font dark:text-font-dark bg-back dark:bg-back-dark p-3 rounded-lg">
        <div className="relative">
          <h1 className="font-bold text-center pb-4 text-2xl">
            Congratulations!
          </h1>
          <CloseButton onClose={() => setIsOpen(false)} />
        </div>
        <DisplayWord word={status === "won" ? wordToGuess : ""} skip={true} />
      </div>
    </Modal>
  );
}

export default WinScreen;

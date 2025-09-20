function Modal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed bg-white/50 dark:bg-black/50 w-screen h-screen-dynamic z-20 top-0 right-0 flex items-center justify-center"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default Modal;

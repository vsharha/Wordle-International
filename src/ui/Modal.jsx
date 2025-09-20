function Modal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed bg-white/50 dark:bg-black/50 w-screen h-screen-dynamic z-20 top-0 right-0 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 w-full md:w-150 md:bottom-1/2 shadow-xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;

function HeaderButton({ children, onClick }) {
  return (
    <button
      className="h-full bg-back hover:brightness-90 aspect-square flex items-center justify-center dark:bg-back-dark text-font dark:text-font-dark"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default HeaderButton;

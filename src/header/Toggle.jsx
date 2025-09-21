function Toggle({ children, value, setValue }) {
  return (
    <div className="input-element">
      <span>{children}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
        className="bg-correct accent-correct dark:accent-correct-dark h-4 w-4"
      />
    </div>
  );
}

export default Toggle;

function Toggle({ children, value, setValue }) {
  return (
    <div className="input-element">
      <span>{children}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
        className="bg-correct"
      />
    </div>
  );
}

export default Toggle;

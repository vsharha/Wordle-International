function Range({ min, max, value, setValue, children }) {
  return (
    <div className="input-element">
      <span>{children}</span>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2 accent-correct dark:accent-correct-dark">
          {min}
          <input
            type="range"
            min={min ? min : 1}
            max={max ? max : 10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className=""
          />
          {max}
        </div>
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
}

export default Range;

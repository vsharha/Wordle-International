import KeyboardButton from "./KeyboardButton.jsx";

function KeyboardLine({ line, addSpace }) {
  return (
    <div
      className={`flex flex-row w-full gap-2 justify-center h-15 justify-center ${addSpace ? "px-4.5" : ""}`}
    >
      {line.map((letter) => (
        <KeyboardButton letter={letter} key={letter} />
      ))}
    </div>
  );
}

export default KeyboardLine;

import { useState, useEffect } from "react";
const paragrah =
  "You're given some existing HTML for a Todo List app. Add the following functionality to the app";

const pgToSpan = (string) => {
  const letters = paragrah.split("");
  return letters?.map((letter, index) => {
    const typedChar = string[index];
    console.log(string);
    const valid = typedChar?.toLowerCase() === letter?.toLowerCase();
    return (
      <span className={valid ? "valid" : "invalid"} key={letter + index}>
        {letter}
      </span>
    );
  });
};
export default function App() {
  const [string, setString] = useState([]);

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Backspace") {
        setString((prev) => {
          prev.pop();
          return [...prev];
        });
      }
      setString((prev) => [...prev, e.key]);
    };
    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, [string]);

  return (
    <div>
      <div>{pgToSpan(string)}</div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

const options = ["hello", "hi", "bojour", "namaste", "sastriyakal"];
export default function App() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleSelect = (index: number) => {
    setSelected(index);
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: React.UIEvent<HTMLDivElement>) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="body">
      <div onClick={() => setShow((prev) => !prev)} className="main">
        <div>{selected !== null ? options[selected] : "Select"}</div>
        <div>v</div>
      </div>
      {show && (
        <div className="wrapper">
          {options.map((option, index) => (
            <div
              onClick={() => handleSelect(index)}
              className="option"
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

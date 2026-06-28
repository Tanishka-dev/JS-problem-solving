import { useState, useEffect, useRef } from "react";
const Square = ({ setStack, index, stack }) => {
  return (
    <div
      style={{ backgroundColor: stack?.includes(index) ? "green" : "" }}
      onClick={() => {
        setStack([...stack, index]);
      }}
      className="square"
    ></div>
  );
};
export default function App() {
  const boxes = new Array(3).fill();
  const [stack, setStack] = useState([]);

  const [unwinding, setUnwinding] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (!unwinding && stack.length === 3) {
      setUnwinding(true);
    }

    if (unwinding && stack.length === 0) {
      setUnwinding(false);
    }

    if (unwinding) {
      timerRef.current = setTimeout(() => {
        const stackClone = [...stack];
        stackClone.pop();
        setStack(stackClone);
      }, 1000);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [unwinding, stack, setUnwinding, setStack]);

  return (
    <div className="main">
      {boxes.map((_, index) => (
        <Square stack={stack} index={index} setStack={setStack} />
      ))}
    </div>
  );
}

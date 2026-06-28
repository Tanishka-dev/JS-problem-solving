import { useState, useRef } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);
  const handleStart = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  return (
    <div>
      <div>Counter</div>
      <button onClick={() => handleStart()}>Start</button>
      <button onClick={() => handleStop()}>Stop</button>
      <div>{count}</div>
    </div>
  );
}

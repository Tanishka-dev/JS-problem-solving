import { useState, useEffect } from "react";
export default function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [show, setShow]);
  return (
    <div className="wrapper">
      <button onClick={() => setShow(true)}>Hit me!</button>
      {show && (
        <div className="alert">
          I am an alert{" "}
          <div onClick={() => setShow(false)} className="cancel">
            X
          </div>
        </div>
      )}
    </div>
  );
}

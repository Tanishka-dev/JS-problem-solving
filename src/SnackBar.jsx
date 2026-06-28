import { useState, useEffect, useRef } from "react";
export default function App() {
  const [snackBar, setSnackBar] = useState([]);
  const addAlert = () => {
    const id = Date.now();

    setSnackBar((prev) => [{ id, message: `Hello ${id}` }, ...prev]);

    setTimeout(() => {
      removeAlert(id);
    }, 3000);
  };

  const removeAlert = (id) => {
    setSnackBar((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <div className="wrapper">
      <button onClick={() => addAlert()}>Hit me!</button>
      {snackBar?.map((item) => (
        <div className="alert">
          {item.message}
          <div onClick={() => removeAlert(item.id)} className="cancel">
            X
          </div>
        </div>
      ))}
    </div>
  );
}

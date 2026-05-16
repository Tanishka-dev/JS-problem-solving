import "./styles.css";
import { useState, useRef } from "react";
export default function App() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const onChangeOTP = (value) => {
    console.log(value);
  };
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }

    const fullOtp = updatedOtp.join("");

    if (fullOtp.length === 4 && !updatedOtp.includes("")) onChangeOTP(fullOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0)
      inputRef.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData("text")
      .replace("/D/g", "")
      .slice(0, 4);

    if (!pastedOtp) return;

    const updatedOtp = [...otp];

    pastedOtp.split("").forEach((digit, index) => (updatedOtp[index] = digit));

    setOtp(updatedOtp);

    const lastIndex = pastedOtp.length - 1;

    if (lastIndex < 4) inputRef.current[lastIndex].focus();

    if (pastedOtp.length === 4) onChangeOTP(updatedOtp);
  };
  return (
    <div className="App">
      {otp.map((digit, index) => (
        <input
          className="input"
          key={index}
          ref={(el) => (inputRef.current[index] = el)}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

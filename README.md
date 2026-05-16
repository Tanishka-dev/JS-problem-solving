# React OTP Input Component (4-digit)

## Description

Create a 4-digit OTP (One-Time Password) input component using React.  
The OTP should be entered one digit per input box.  
The focus should auto-move as the user types or deletes, and the component should support pasting a full OTP.  
It should also reject any non-numeric characters.

---

## Constraints & Edge Cases

- **Only numeric input is allowed.**
- If a box is **empty and backspace is pressed**, move focus to the **previous box**.
- **Paste** (e.g., `"1234"`) should **fill all 4 boxes correctly**.

---

## Requirements

- Create a component that renders **4 input boxes**, each accepting **only one numeric digit**.
- **Automatically move focus to the next input** when a digit is entered.
- **Automatically move focus to the previous input** when backspace is pressed on an empty field.
- If the user **pastes the OTP** (e.g. `"1234"`), each box should fill with a digit.
- Once all 4 digits are entered, **trigger a callback** `onChangeOTP` and send the full OTP string.
- **Disallow any non-numeric input.**

---

## Expected UI

![Expected UI](https://i.ibb.co/SD6cxmJy/otpInput.gif)

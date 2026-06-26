// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}
function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

import { useState, useEffect } from "react";

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getData = async (value) => {
      try {
        const res = await getSuggestions(value);
        setSuggestions(res);
      } catch (e) {
        console.log(e);
      }
    };

    if (!inputVal) return;
    getData(inputVal);
  }, [inputVal]);

  const onClick = (item) => {
    setInputVal(item);
  };

  return (
    <div className="main">
      <input
        onChange={(e) => setInputVal(e.target.value)}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        id="search"
        value={inputVal}
        placeholder="Search here"
      />
      {isOpen && (
        <div onFocus={() => setIsOpen(true)} id="suggestion-box">
          <ul>
            {suggestions.map((item) => (
              <li className="list-item" onClick={() => onClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

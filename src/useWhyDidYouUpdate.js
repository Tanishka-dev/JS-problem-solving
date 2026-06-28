import { useRef, useEffect, useState } from "react";
const useWhyDidYouUpdate = (name, props) => {
  const prevProps = useRef();

  useEffect(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...prevProps.current, ...props });
      const whyUpdated = {};
      keys.forEach((key) => {
        if (
          typeof prevProps.current[key] === "object" &&
          typeof props[key] === "object"
        ) {
          if (
            JSON.stringify(prevProps.current[key]) !==
            JSON.stringify(props[key])
          ) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        } else {
          if (prevProps.current[key] !== props[key]) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        }
      });

      if (Object.entries(whyUpdated).length) {
        console.log("This is why componenet updated", whyUpdated);
      }
    }

    prevProps.current = props;
  }, [name, props]);
};

const Counter = (props) => {
  useWhyDidYouUpdate("Counter", props);
  return (
    <>
      <div>Count is {props.count}</div>
    </>
  );
};

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Counter count={count} />
    </>
  );
}

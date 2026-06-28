import { useEffect } from "react";
export default function App() {
  const gridEle = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  useEffect(() => {
    const inViewport = (ele) => {
      const eleDim = ele.getBoundingClientRect();

      const viewHeight = window.innerHeight;
      const viewWidth = window.innerWidth;

      return (
        eleDim.top >= 0 &&
        eleDim.left >= 0 &&
        eleDim.right <= viewWidth &&
        eleDim.bottom <= viewHeight
      );
    };

    const detect = () => {
      const res = [];

      const blocks = document.querySelectorAll(".box");

      blocks.forEach((block) => {
        if (inViewport(block)) {
          res.push(block.textContent);
        }
      });

      console.log(res);
    };

    const debounce = (func, delay) => {
      let inDebounce;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
      };
    };
    const debouncedDetect = debounce(detect, 1000);

    window.addEventListener("scroll", debouncedDetect);

    return () => {
      window.removeEventListener("scroll", debouncedDetect);
    };
  });
  return (
    <div className="main">
      {gridEle.map((item, index) => (
        <div className="box" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}

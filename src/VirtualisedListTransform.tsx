import { useState } from "react";

interface VirtualisedListDataType {
  list: number[];
  height: number;
  width: number;
  itemHeight: number;
}
function VirtualisedList({
  list,
  height,
  width,
  itemHeight,
}: VirtualisedListDataType) {
  const itemNumber = Math.floor(height / itemHeight);
  const [indices, setIndices] = useState([0, itemNumber]);
  const visiblelist = list.slice(indices[0], indices[1] + 1);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;

    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + itemNumber;

    setIndices([newStartIndex, newEndIndex]);
  };
  return (
    <div
      onScroll={handleScroll}
      style={{ height, width }}
      className="container"
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${indices[0] * itemHeight}px)` }}>
          {visiblelist?.map((item, index) => (
            <div style={{ height: itemHeight }} className="element" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const List = Array.from({ length: 100000 }, (_, index) => index + 1);
  return (
    <div>
      <VirtualisedList list={List} height={400} width={300} itemHeight={35} />
    </div>
  );
}

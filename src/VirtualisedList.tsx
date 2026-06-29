import { useState } from "react";

interface VirtualisedListDataType {
  list: number[];
  height: number;
  width: number;
  itemHeight: number;
}
const VirtualisedList = ({
  list,
  height,
  width,
  itemHeight,
}: VirtualisedListDataType) => {
  const itemNumber = Math.floor(height / itemHeight);
  const [indices, setIndices] = useState([0, itemNumber]);
  const visibleList = list.slice(indices[0], indices[1] + 1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + itemNumber;
    setIndices([newStartIndex, newEndIndex]);
  };
  return (
    <div
      onScroll={handleScroll}
      className="container"
      style={{ height, width }}
    >
      <div
        style={{ height: list.length * itemHeight, position: "relative" }}
        className="wrap"
      >
        {visibleList.map((item, index) => (
          <div
            style={{
              height: itemHeight,
              position: "absolute",
              top: (indices[0] + index) * itemHeight,
              width: "100%",
              textAlign: "center",
            }}
            className="element"
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const List = Array.from({ length: 100000 }, (_, index) => index + 1);
  return (
    <div>
      <VirtualisedList list={List} height={400} width={300} itemHeight={35} />
    </div>
  );
}

import { useState } from "react";

interface DataType {
  id: number;
  name: string;
  children?: DataType[];
}
const ChildNode = ({ data }: { data: DataType[] | undefined }) => {
  return (
    <>
      {data?.map((item) => {
        const hasChildren = item?.children ? true : false;
        const [show, setShow] = useState(false);
        return (
          <div>
            <div className="name-icon-wrapper">
              {item.name}
              {hasChildren && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? "-" : "+"}
                </div>
              )}
            </div>
            {hasChildren && show && (
              <div className="child-wrapper">
                <ChildNode data={item.children} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
export default function FileExplorer({ data }: { data: DataType[] }) {
  return (
    <div>
      <ChildNode data={data} />
    </div>
  );
}

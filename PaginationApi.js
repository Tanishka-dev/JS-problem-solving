import { useState, useEffect } from "react";
const URL = "https://punkapi-alxiw.amvera.io/v3/beers?page=1";

export default function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchApi = async () => {
    try {
      let res = await fetch(
        `https://punkapi-alxiw.amvera.io/v3/beers?page=${page}`,
      );
      res = await res.json();
      console.log(res);
      setList(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchApi();
  });
  return (
    <div>
      <label>Page</label>
      <select onClick={(e) => setPage(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      {list?.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          <div>{item.tagline}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

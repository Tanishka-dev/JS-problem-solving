import { useEffect, useState } from "react";
const URL = "https://rickandmortyapi.com/api/character";

export default function App() {
  const [data, setData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(URL);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [triggerApi, setTriggerApi] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        if (isDone) {
          return;
        }

        const _resp = await fetch(currentUrl);
        const resp = await _resp.json();
        const { info, results } = resp;
        setData(results);
        if (info.next) {
          setCurrentUrl(info.next);
        } else {
          setIsDone(true);
        }

        console.log(resp);
      } catch (e) {
        console.log("Error", e);
      } finally {
        setIsLoading(false);
        setTriggerApi(false);
      }
    };
    if (triggerApi) {
      fetchApi();
    }
  }, [currentUrl, triggerApi]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - 50
      ) {
        setTriggerApi(true);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerApi]);
  return (
    <div className="wrapper">
      {data?.map((item, index) => (
        <div key={index}>
          <img src={item.image} />
          <div>{item.name}</div>
          <div>{item.species}</div>
        </div>
      ))}
    </div>
  );
}

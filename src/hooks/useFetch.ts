import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
    // eslint-disable-next-line
  }, []);

  return { data };
};

export default useFetch;

import axios from "axios";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([] as any);
  const [data2, setData2] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [x, setX] = useState(0);

  useEffect(() => {
    try {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res: any) => {
          setData(res.data);
          setIsLoading(true);
          setData2(res.data.slice(0,10))
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setData2([...data2, ...data.slice(x,x+10)])
  },[x])

  const handleLoadMore =() => {
    setX(x+10)
  }
console.log(data2)
  return (
    <div>
      {isLoading === false ? (
        <div>Loading...</div>
      ) : (data2 &&
        data2?.map((res: any) => {
          return (
            <div key={res.id}>
              <p>{res.id}</p>
              <p>{res.title}</p>
            </div>
          );
        })
      )}
      <button
      onClick={handleLoadMore}
      >load more</button>
    </div>
  );
}

export default Index;

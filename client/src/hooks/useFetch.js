import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fethData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText},${res.status}`);
        }
        setData(data);
        setError();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fethData();
  }, dependencies);
  return { data, loading, error };
};

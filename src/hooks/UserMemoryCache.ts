import { useEffect, useState } from "react";

const cache: { [key: string]: any } = {};

const useMemoryCache = <T>(
  key: string | number,
  fetcher: () => Promise<T>,
  ttl: number
) => {
  const cacheKey = typeof key === "string" ? key : key.toString();
  const now = Date.now();

  const initializeCache = () => {
    const cached = cache[cacheKey];
    if (cached && now < cached.expiry) {
      return cached.data;
    }
    return null;
  };

  const [data, setData] = useState<T | null>(initializeCache);

  useEffect(() => {
    if (data) {
      return;
    }

    fetcher().then((fetchedData) => {
      setData(fetchedData);
      cache[cacheKey] = {
        data: fetchedData,
        expiry: Date.now() + ttl,
      };
    });
  }, [cacheKey, data, fetcher, ttl]);

  return data;
};

export default useMemoryCache;

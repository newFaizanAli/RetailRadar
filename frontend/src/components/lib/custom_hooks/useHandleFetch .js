import { useCallback, useRef, useState } from "react";
import { Fetchdata } from "../handleFetch/FetchData";

export const useHandleFetch = () => {
  const loadProgress = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = useCallback(
    async (method, url, body, form) => {
      loadProgress?.current?.continuousStart();

      try {
        setIsLoading(true);
        const result = await Fetchdata(method, url, body, form);
        setIsLoading(false);

        return result;
      } catch (e) {
        console.error("Error during fetch:", e.message);
      } finally {
        loadProgress?.current?.complete();
      }
    },
    [loadProgress]
  );

  return { handleFetch, isLoading };
};

// hooks/useInfiniteScroll.js
import { useEffect } from "react";

const useInfiniteScroll = (callback, isLoading) => {
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !isLoading) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, isLoading]);
};

export default useInfiniteScroll;

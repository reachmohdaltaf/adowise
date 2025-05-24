import { useEffect, useCallback } from "react";

const useInfiniteScroll = (ref, callback, deps = []) => {
  const handleScroll = useCallback(() => {
    const container = ref.current;
    if (!container) return;

    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight - 5
    ) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, ...deps]); // ✅ Don't spread ref here
};

export default useInfiniteScroll;

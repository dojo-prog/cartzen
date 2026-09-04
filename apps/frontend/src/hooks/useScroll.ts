import { useEffect, useRef } from "react";

type Props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export const useScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasNextPage) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isFetchingNextPage) return;

        await fetchNextPage();
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { observerRef };
};

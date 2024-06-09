import { PropsWithChildren, RefObject, useEffect } from 'react';

interface InfinityScrollProp {
  fetchNextPage: () => void;
  bottomRef: RefObject<HTMLDivElement>;
  isFetching: boolean;
  hasNextPage: boolean;
}

const InfinityScrollContainer = ({
  isFetching,
  hasNextPage,

  fetchNextPage,
  bottomRef,
  children,
}: PropsWithChildren<InfinityScrollProp>) => {
  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    };

    const options = { rootMargin: '0px 0px 30% 0px' };

    const io = new IntersectionObserver(onIntersect, options);

    if (bottomRef.current) {
      io.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        io.unobserve(bottomRef.current);
      }
    };
  }, [isFetching, fetchNextPage]);

  return <>{children}</>;
};

export default InfinityScrollContainer;

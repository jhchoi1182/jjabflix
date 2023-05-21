import { useState, useEffect, useCallback } from "react";

export const useLazyLoad = (slideRefs: React.RefObject<HTMLElement>[]): number => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentIndex = slideRefs.findIndex((ref) => {
            return ref.current === entry.target;
          });
          if (currentIndex === currentSlide) {
            setCurrentSlide((prev) => prev + 1);
          }
        }
      });
    },
    [currentSlide, slideRefs]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    slideRefs.forEach((slideRef) => {
      if (slideRef.current) {
        observer.observe(slideRef.current);
      }
    });

    return () => {
      slideRefs.forEach((slideRef) => {
        if (slideRef.current) {
          observer.unobserve(slideRef.current);
        }
      });
    };
  }, [handleIntersection, slideRefs]);

  return currentSlide;
};

import { useEffect, useState, RefObject } from "react";

export const useInView = (
  ref: RefObject<Element> | RefObject<null>,
  rootMargin: string = "0px",
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observedElement = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(observedElement);

    return () => {
      observer.unobserve(observedElement);
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useInView;

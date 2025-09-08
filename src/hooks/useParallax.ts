import { useState, useEffect, useCallback } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    setIsScrolling(true);
    
    // Clear scrolling flag after a delay
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let ticking = false;

    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
    };
  }, [handleScroll]);

  return { scrollY, isScrolling };
}

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
}

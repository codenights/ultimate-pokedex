import React from "react";

export function useIntersectionObserver({
  callback,
  root,
  rootMargin,
  threshold,
}) {
  const [node, setNode] = React.useState(null);
  const observer = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new window.IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    });

    if (node) {
      observer.current.observe(node);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [node, root, rootMargin, threshold]);

  return {
    setObservedNode: setNode,
  };
}

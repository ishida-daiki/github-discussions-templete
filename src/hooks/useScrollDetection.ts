import { useEffect, useRef, useState } from "preact/hooks";

export function useScrollDetection(dependencies: any[]) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsScroll(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, dependencies);

  return { contentRef, needsScroll };
}
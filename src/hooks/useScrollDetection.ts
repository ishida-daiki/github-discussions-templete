import { useEffect, useRef, useState } from "preact/hooks";

/**
 * useScrollDetection フック
 * 
 * コンテンツがスクロール可能かどうかを検出するためのカスタムフックです。
 * 指定された依存関係が変化したときに、コンテンツがスクロール可能かどうかをチェックします。
 * 
 * @param {Array<any>} dependencies - フックが再評価されるトリガーとなる依存関係の配列。
 * @return {RefObject<HTMLDivElement>} contentRef - スクロール可能なコンテンツの参照。
 * @return {boolean} needsScroll - コンテンツがスクロール可能かどうかを示すフラグ。
 */
export function useScrollDetection(dependencies: any[]) {
  // スクロール可能なコンテンツの参照
  const contentRef = useRef<HTMLDivElement>(null);

  // コンテンツがスクロール可能かどうかを示すフラグ
  const [needsScroll, setNeedsScroll] = useState(false);

  // 依存関係が変化したときにスクロールの必要性をチェックする副作用フック
  useEffect(() => {
    if (contentRef.current) {
      setNeedsScroll(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, dependencies);

  return { contentRef, needsScroll };
}
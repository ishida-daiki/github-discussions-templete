import { DropdownOption, RadioButtonsOption } from "@create-figma-plugin/ui";
import { useEffect, useRef, useState } from "preact/hooks";

/**
 * useScrollDetection フック
 *
 * コンテンツがスクロール可能かどうかを検出するためのカスタムフックです。
 * 指定された依存関係が変化したときに、コンテンツがスクロール可能かどうかをチェックします。
 * @param {object} dependencies - フックが再評価されるトリガーとなる依存関係のオブジェクト。
 * 
 * @return {RefObject<HTMLDivElement>} contentRef - スクロール可能なコンテンツの参照。
 * @return {boolean} needsScroll - コンテンツがスクロール可能かどうかを示すフラグ。
 */
export function useScrollDetection(dependencies: {
  options: Array<DropdownOption>;
  labelOptions: Array<RadioButtonsOption>;
  selectedFiles: Array<File>;
  elementName: string | null;
  category: string | null;
  body: string;
  isLoadingLabels: boolean;
}) {
  const {
    options,
    labelOptions,
    selectedFiles,
    elementName,
    category,
    body,
    isLoadingLabels,
  } = dependencies;
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
  }, [dependencies]);

  return { contentRef, needsScroll };
}

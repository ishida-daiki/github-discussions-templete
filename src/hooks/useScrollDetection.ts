import { DropdownOption, RadioButtonsOption } from "@create-figma-plugin/ui";
import { RefObject } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

type UseScrollDetectionDependenciesResult = {
  /**
   * スクロール可能なコンテンツの参照
   */
  contentRef: RefObject<HTMLDivElement>;
  /**
   * コンテンツがスクロール可能かどうかを示すフラグ
   */
  needsScroll: boolean;
}

/**
 * useScrollDetection フック
 *
 * コンテンツがスクロール可能かどうかを検出するためのカスタムフックです。
 * 指定された依存関係が変化したときに、コンテンツがスクロール可能かどうかをチェックします。
 * @param {object} dependencies - フックが再評価されるトリガーとなる依存関係のオブジェクト。
 * 
 * @returns {UseScrollDetectionDependenciesResult} 結果オブジェクトには以下のプロパティが含まれます:
 * - contentRef: スクロール可能なコンテンツの参照
 * - needsScroll: コンテンツがスクロール可能かどうかを示すフラグ
 */
export function useScrollDetection(dependencies: {
  options: Array<DropdownOption>;
  labelOptions: Array<RadioButtonsOption>;
  selectedFiles: Array<File>;
  elementName: string | null;
  category: string | null;
  body: string;
  isLoadingLabels: boolean;
}): UseScrollDetectionDependenciesResult {
  const {
    options,
    labelOptions,
    selectedFiles,
    elementName,
    category,
    body,
    isLoadingLabels,
  } = dependencies;
  const contentRef = useRef<HTMLDivElement>(null);
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

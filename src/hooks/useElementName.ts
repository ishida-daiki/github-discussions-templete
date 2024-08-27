import { useState, useEffect } from "preact/hooks";

type UseElementNameResult = {
  /**
   * 現在選択されている要素の名前
   */
  elementName: string | null;
  /**
   * 要素名を更新する関数
   */
  setElementName: (elementName: string) => void;
  /**
   * 生成されたURL
   */
  generatedUrl: string | null;
};

/**
 * useElementName フック
 *
 * Figma ドキュメント内の選択された要素の名前と対応する URL を管理するカスタムフックです。
 * 要素が選択されたときに要素名を更新し、対応する URL を生成します。
 * 要素が選択解除されたときには、要素名と生成された URL を初期化します。
 *
 * @returns {UseElementNameResult} 結果オブジェクトには以下のプロパティが含まれます:
 * - elementName: 現在選択されている要素の名前
 * - setElementName: 要素名を更新する関数
 * - generatedUrl: 生成されたURL
 */
export function useElementName(): UseElementNameResult {
  const [elementName, setElementName] = useState<null | string>(
    "Discussion Select the element you want to discuss"
  );
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "selection-cleared") {
        setElementName("Discussion Select the element you want to discuss");
        setGeneratedUrl(null);
      } else if (pluginMessage.type === "update-name") {
        setElementName(pluginMessage.name);
      } else if (pluginMessage.type === "generate-url") {
        const { nodeId, fileKey, pageName } = pluginMessage;
        const encodedPageName = encodeURIComponent(pageName);
        const url = `https://www.figma.com/design/${fileKey}/${encodedPageName}?node-id=${nodeId.replace(
          /:/g,
          "-"
        )}`;
        setGeneratedUrl(url);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { elementName, setElementName, generatedUrl };
}
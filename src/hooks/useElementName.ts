import { useState, useEffect } from "preact/hooks";

/**
 * useElementName フック
 *
 * Figma ドキュメント内の選択された要素の名前と対応する URL を管理するカスタムフックです。
 * 要素が選択されたときに要素名を更新し、対応する URL を生成します。
 * 要素が選択解除されたときには、要素名と生成された URL を初期化します。
 *
 * @return {string | null} elementName - 現在選択されている要素の名前。
 * @return {function} setElementName - 要素名を更新するための関数。
 * @return {string | null} generatedUrl - 選択された要素の対応URL。
 */
export function useElementName() {
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
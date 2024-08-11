import { useState, useEffect } from "preact/hooks";

/**
 * useElementName フック
 * 
 * 選択した要素の名前を管理するためのカスタムフック。
 * 選択解除時には名前を初期化し、名前が更新されたときには URL を生成する。
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
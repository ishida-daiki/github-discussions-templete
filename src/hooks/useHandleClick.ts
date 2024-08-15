import { JSX } from "preact";

/**
 * useHandleClick フック
 *
 * Submit ボタン押下時に実行されるクリックイベントを処理するためのカスタムフックです。
 * 画像のアップロードやメッセージの投稿を行い、必要な状態を更新します。
 *
 * @param {object} dependencies - フックが必要とする依存関係のオブジェクト。
 * @param {string | null} dependencies.elementName - 要素名。
 * @param {function} dependencies.setElementName - 要素名を設定する関数。
 * @param {string | null} dependencies.generatedUrl - 生成されたURL。
 * @param {function} dependencies.fileToBase64 - ファイルをbase64文字列に変換する関数。
 * @param {Array<File>} dependencies.selectedFiles - 現在選択されているファイルの配列。
 * @param {function} dependencies.setSelectedFiles - 選択されているファイルの配列を更新する関数。
 * @param {string | null} dependencies.category - 現在選択されているカテゴリ。
 * @param {object} dependencies.categoryMap - カテゴリ名とカテゴリIDのマッピング。
 * @param {Array<{ value: string }>} dependencies.labelOptions - ラベルオプションの配列。
 * @param {object} dependencies.labelMap - ラベル名とラベルIDのマッピング。
 * @param {Array<string>} dependencies.segmentedControlValues - セグメントコントロールの選択状態。
 * @param {string} dependencies.body - 投稿するメッセージ本文。
 * @param {string} dependencies.title - 投稿するメッセージのタイトル。
 * @param {function} dependencies.setIsLoading - ローディング状態を設定する関数。
 * @param {boolean} dependencies.isLoadingLabels - ラベルのロード状態。
 * @param {function} dependencies.setTitle - 投稿タイトルを設定する関数。
 * @param {function} dependencies.setBody - 投稿本文を設定する関数。
 * @param {function} dependencies.setCategory - カテゴリを設定する関数。
 * @param {function} dependencies.setSegmentedControlValues - セグメントコントロールの選択状態を更新する関数。
 *
 * @return {function} handleClick - クリックイベントを処理する関数。
 */
export function useHandleClick(dependencies: {
  elementName: string | null;
  setElementName: (elementName: string) => void;
  generatedUrl: string | null;
  fileToBase64: (file: File) => Promise<string>;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  category: string | null;
  categoryMap: Record<string, string>;
  labelOptions: { value: string }[];
  labelMap: Record<string, string>;
  segmentedControlValues: string[];
  body: string;
  title: string;
  setIsLoading: (loading: boolean) => void;
  isLoadingLabels: boolean;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setCategory: (category: string | null) => void;
  setSegmentedControlValues: (values: string[]) => void;
}) {
  const {
    elementName,
    setElementName,
    generatedUrl,
    fileToBase64,
    selectedFiles,
    setSelectedFiles,
    category,
    categoryMap,
    labelOptions,
    labelMap,
    segmentedControlValues,
    body,
    title,
    setIsLoading,
    setTitle,
    setBody,
    setCategory,
    setSegmentedControlValues,
  } = dependencies;

  /**
   * Clickイベントを処理する関数。画像のアップロードやメッセージの投稿を行います。
   *
   * @param {JSX.TargetedMouseEvent<HTMLButtonElement>} event - クリックイベント。
   */
  const handleClick = async (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    try {
      let imageUrl: string | null = null;
      if (selectedFiles && selectedFiles.length > 0) {
        const file = selectedFiles[0];
        const path = `images/${file.name}`;
        const content = await fileToBase64(file);
        imageUrl = await new Promise((resolve) => {
          let handler: (event: MessageEvent) => void;
          let _oldListener: ((this: Window, ev: MessageEvent) => any) | null =
            window.onmessage;
          window.onmessage = (event) => {
            _oldListener?.call(window, event);
            handler(event);
          };
          parent.postMessage(
            {
              pluginMessage: {
                type: "upload-image",
                fileData: content,
                path: path,
              },
            },
            "*"
          );
          handler = function (event: MessageEvent) {
            if (event.data.pluginMessage.type === "image-uploaded") {
              resolve(event.data.pluginMessage.imageUrl);
              if (!_oldListener) {
                window.onmessage = _oldListener;
              }
            }
          };
        });
      }

      const categoryId = category ? categoryMap[category] : undefined;
      const labelIds: string[] = segmentedControlValues.reduce(
        (ids: string[], value: string, index: number) => {
          if (value === "icons-size-16--option-check" && labelOptions[index]) {
            const labelId = labelMap[labelOptions[index].value];
            if (labelId) {
              ids.push(labelId);
            }
          }
          return ids;
        },
        []
      );

      let messageBody: string = "";
      if (imageUrl) {
        messageBody += `![image](${imageUrl})\n\n`;
      }
      messageBody += `${body}\n\n`;
      if (generatedUrl) {
        messageBody += `${generatedUrl}`;
      }

      parent.postMessage(
        {
          pluginMessage: {
            type: "post-message",
            title: title,
            body: messageBody,
            elementName: elementName,
            categoryId: categoryId,
            labelIds: labelIds,
          },
        },
        "*"
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setTitle("");
      setBody("");
      setCategory(null);
      setElementName("Discussion Select the element you want to discuss");
      setSelectedFiles([]);
      const defaultValues = labelOptions.map(
        () => "icons-size-16--option-disabled"
      );
      setSegmentedControlValues(defaultValues);
    } catch (error) {
      console.error("Error uploading file or sending message:", error);
      setIsLoading(false);
    }
  };

  return { handleClick };
}

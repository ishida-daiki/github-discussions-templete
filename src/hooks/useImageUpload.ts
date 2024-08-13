import { useState } from "preact/hooks";

/**
 * useImageUpload フック
 * 
 * 画像アップロードを管理するためのカスタムフックです。
 * 選択されたファイルを管理し、ファイルを base64 エンコードに変換します。
 * 
 * @return {Array<File>} selectedFiles - 現在選択されているファイルの配列。
 * @return {function} setSelectedFiles - 選択されているファイルの配列を更新する関数。
 * @return {function} fileToBase64 - ファイルを base64 文字列へと変換する関数。
 * @return {function} handleSelectedFiles - 選択されたファイルを処理し、状態を更新する関数。
 */
export function useImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

  /**
   * ファイルを base64 文字列に変換する関数
   * 
   * @param {File} file - 変換するファイル
   * @returns {Promise<string>} base64 文字列としてのファイル内容
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64str = (reader.result as string).replace(
          /data:.*\/.*;base64,/,
          ""
        );
        resolve(base64str);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  /**
   * 選択されたファイルを処理し、状態を更新する関数
   * 
   * @param {Array<File>} files - 選択されたファイルの配列
   */
  const handleSelectedFiles = (files: Array<File>) => {
    /**
     * ファイル名をフォーマットするヘルパー関数
     * 
     * @param {string} fileName - オリジナルのファイル名
     * @returns {string} フォーマットされたファイル名
     */
    const formatFileName = (fileName: string): string => {
      const parts = fileName.split(".");
      const extension = parts.pop();
      const baseName = parts.join(".");

      const formattedName = baseName.replace(/\s+/g, "-");

      return `${formattedName}.${extension}`;
    };

    const formattedFiles = files.map((file) => {
      const formattedName = formatFileName(file.name);
      return new File([file], formattedName, { type: file.type });
    });
    setSelectedFiles(formattedFiles);
  };

  return {
    selectedFiles,
    setSelectedFiles,
    fileToBase64,
    handleSelectedFiles,
  };
}
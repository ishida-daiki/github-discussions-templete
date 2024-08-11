import { useState } from "preact/hooks";

export function useImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleSelectedFiles = (files: Array<File>) => {
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
    isLoading,
    setIsLoading,
    fileToBase64,
    handleSelectedFiles,
  };
}

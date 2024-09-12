import { renderHook, act } from "@testing-library/preact-hooks";
import { useImageUpload } from "../useImageUpload";

describe("useImageUpload", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useImageUpload());
    expect(result.current?.selectedFiles).toEqual([]);
  });

  it("should handle selected files", () => {
    const { result } = renderHook(() => useImageUpload());
    const files = [new File(["content"], "file name.txt")];

    act(() => {
      result.current?.handleSelectedFiles(files);
    });

    expect(result.current?.selectedFiles[0].name).toBe("file-name.txt");
  });

  it("should convert file to base64", async () => {
    const { result } = renderHook(() => useImageUpload());
    const file = new File(["content"], "file.txt");

    const base64 = await result.current?.fileToBase64(file);
    expect(base64).toBe("Y29udGVudA==");
  });
});

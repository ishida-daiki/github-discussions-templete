import { renderHook, act } from "@testing-library/preact-hooks";
import { useHandleClick } from "../useHandleClick";

describe("useHandleClick", () => {
  const dependencies = {
    elementName: "element",
    setElementName: jest.fn(),
    generatedUrl: "url",
    fileToBase64: jest.fn().mockResolvedValue("base64"),
    selectedFiles: [],
    setSelectedFiles: jest.fn(),
    category: "category",
    categoryMap: { category: "1" },
    labelOptions: [{ value: "label" }],
    labelMap: { label: "1" },
    segmentedControlValues: ["icons-size-16--option-check"],
    body: "body",
    title: "title",
    setIsLoading: jest.fn(),
    isLoadingLabels: false,
    setTitle: jest.fn(),
    setBody: jest.fn(),
    setCategory: jest.fn(),
    setSegmentedControlValues: jest.fn(),
  };

  it("should handle click event", async () => {
    const { result } = renderHook(() => useHandleClick(dependencies));
    await act(async () => {
      await result.current?.handleClick({} as any);
    });

    expect(dependencies.setIsLoading).toHaveBeenCalledWith(false);
    expect(dependencies.setTitle).toHaveBeenCalledWith("");
    expect(dependencies.setBody).toHaveBeenCalledWith("");
    expect(dependencies.setCategory).toHaveBeenCalledWith(null);
    expect(dependencies.setElementName).toHaveBeenCalledWith(
      "Discussion Select the element you want to discuss"
    );
    expect(dependencies.setSelectedFiles).toHaveBeenCalledWith([]);
  });
});

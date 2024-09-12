import { renderHook, act } from "@testing-library/preact-hooks";
import { useElementName } from "../useElementName";

describe("useElementName", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useElementName());
    expect(result.current?.elementName).toBe(
      "Discussion Select the element you want to discuss"
    );
    expect(result.current?.generatedUrl).toBeNull();
  });

  it("should update elementName on message event", () => {
    const { result } = renderHook(() => useElementName());
    const event = new MessageEvent("message", {
      data: {
        pluginMessage: {
          type: "update-name",
          name: "new-element-name",
        },
      },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current?.elementName).toBe("new-element-name");
  });

  it("should generate URL on message event", () => {
    const { result } = renderHook(() => useElementName());
    const event = new MessageEvent("message", {
      data: {
        pluginMessage: {
          type: "generate-url",
          nodeId: "123",
          fileKey: "abc",
          pageName: "page",
        },
      },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current?.generatedUrl).toBe(
      "https://www.figma.com/design/abc/page?node-id=123"
    );
  });
});

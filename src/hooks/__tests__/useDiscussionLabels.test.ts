import { renderHook, act } from "@testing-library/preact-hooks";
import { useDiscussionLabels } from "../useDiscussionLabels";

describe("useDiscussionLabels", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDiscussionLabels());
    expect(result.current?.isLoadingLabels).toBe(true);
    expect(result.current?.labelMap).toEqual({});
    expect(result.current?.labelOptions).toEqual([]);
    expect(result.current?.segmentedControlValues).toEqual([]);
  });

  it("should update label options and map on message event", () => {
    const { result } = renderHook(() => useDiscussionLabels());
    const event = new MessageEvent("message", {
      data: {
        pluginMessage: {
          type: "discussion-labels",
          labels: [
            { name: "label1", id: "1" },
            { name: "label2", id: "2" },
          ],
        },
      },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current?.labelOptions).toEqual([
      { children: expect.anything(), value: "label1" },
      { children: expect.anything(), value: "label2" },
    ]);
    expect(result.current?.labelMap).toEqual({ label1: "1", label2: "2" });
    expect(result.current?.isLoadingLabels).toBe(false);
  });

  it("should handle segmented control change", () => {
    const { result } = renderHook(() => useDiscussionLabels());
    act(() => {
      result.current?.createHandleChangeSegmentedControl(0)({
        currentTarget: { value: "icons-size-16--option-check" },
      } as any);
    });
    expect(result.current?.segmentedControlValues[0]).toBe(
      "icons-size-16--option-check"
    );
  });
});

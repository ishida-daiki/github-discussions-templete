import { renderHook, act } from "@testing-library/preact-hooks";
import { useFormState } from "../useFormState";

describe("useFormState", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useFormState());
    expect(result.current?.title).toBe("");
    expect(result.current?.body).toBe("");
  });

  it("should update title", () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current?.handleInputTitle({
        currentTarget: { value: "new title" },
      } as any);
    });
    expect(result.current?.title).toBe("new title");
  });

  it("should update body", () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current?.handleInputBody({
        currentTarget: { value: "new body" },
      } as any);
    });
    expect(result.current?.body).toBe("new body");
  });
});

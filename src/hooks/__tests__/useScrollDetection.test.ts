import { renderHook } from '@testing-library/preact-hooks';
import { useScrollDetection } from '../useScrollDetection';

describe('useScrollDetection', () => {
  const dependencies = {
    options: [],
    labelOptions: [],
    selectedFiles: [],
    elementName: null,
    category: null,
    body: '',
    isLoadingLabels: false,
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useScrollDetection(dependencies));
    expect(result.current?.needsScroll).toBe(false);
  });

  it('should detect scroll need', () => {
    const { result } = renderHook(() => useScrollDetection(dependencies));
    const contentRef = result.current?.contentRef;

    if (contentRef?.current) {
      Object.defineProperty(contentRef.current, 'scrollHeight', { value: 200 });
      Object.defineProperty(contentRef.current, 'clientHeight', { value: 100 });
    }

    expect(result.current?.needsScroll).toBe(true);
  });
});
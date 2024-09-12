import { renderHook, act } from '@testing-library/preact-hooks';
import { useDiscussionCategories } from '../useDiscussionCategories';

describe('useDiscussionCategories', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDiscussionCategories());
    expect(result.current?.options).toEqual([]);
    expect(result.current?.category).toBeNull();
    expect(result.current?.categoryMap).toEqual({});
  });

  it('should handle category change', () => {
    const { result } = renderHook(() => useDiscussionCategories());
    act(() => {
      const event = { currentTarget: { value: 'new-category' } } as React.ChangeEvent<HTMLInputElement>;
      result.current?.handleTagChange(event);
    });
    expect(result.current?.category).toBe('new-category');
  });

  it('should update options and categoryMap on message event', () => {
    const { result } = renderHook(() => useDiscussionCategories());
    const event = new MessageEvent('message', {
      data: {
        pluginMessage: {
          type: 'discussion-categories',
          categories: [{ name: 'category1' }, { name: 'category2' }],
          categoryMap: { category1: '1', category2: '2' },
        },
      },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current?.options).toEqual([{ value: 'category1' }, { value: 'category2' }]);
    expect(result.current?.categoryMap).toEqual({ category1: '1', category2: '2' });
  });
});
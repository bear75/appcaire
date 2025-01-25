import { act, renderHook } from '@testing-library/react';

import { useMenu } from '../core/use-menu';

describe('useMenu', () => {
  it('should initialize with isOpen as false', () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle isOpen state', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should open menu', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should close menu', () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
}); 
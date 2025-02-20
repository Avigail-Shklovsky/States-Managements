import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useModal } from '../../hooks/useModal';

describe('useModal Hook', () => {
  it('should toggle modal state', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.openModal());
    expect(result.current.isModalOpen).toBe(true);

    act(() => result.current.closeModal());
    expect(result.current.isModalOpen).toBe(false);
  });
});

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { vi } from 'vitest';

import { ActiveLink } from './ActiveLink';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('ActiveLink', () => {
  const mockUsePathname = vi.fn();
  (usePathname as jest.Mock).mockImplementation(() => mockUsePathname());

  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it('renders children correctly', () => {
    mockUsePathname.mockReturnValue('/some/path');

    render(<ActiveLink href="/test">Test Link</ActiveLink>);

    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('adds active class when current path matches href', () => {
    mockUsePathname.mockReturnValue('/dashboard/test');

    render(<ActiveLink href="/test">Test Link</ActiveLink>);

    const link = screen.getByRole('link');

    expect(link).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('does not add active class when current path does not match href', () => {
    mockUsePathname.mockReturnValue('/dashboard/other');

    render(<ActiveLink href="/test">Test Link</ActiveLink>);

    const link = screen.getByRole('link');

    expect(link).not.toHaveClass('bg-primary', 'text-primary-foreground');
  });
});

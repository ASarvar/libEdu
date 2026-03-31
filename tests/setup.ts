import { afterEach, vi } from 'vitest';

afterEach(() => {
  // Keep tests isolated when using spies/mocks.
  vi.restoreAllMocks();
});

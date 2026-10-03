import { useEffect, useState } from 'react';

/** True after the first client render. Use it to avoid hydration mismatches with persisted stores. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

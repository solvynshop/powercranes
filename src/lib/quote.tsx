/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { FleetId } from './fleet';

/** Lift details handed from the planner / fleet cards to the quote form. */
export type QuoteDraft = {
  craneId?: FleetId | '';
  load?: number;
  radius?: number;
  height?: number;
};

type QuoteContextValue = {
  draft: QuoteDraft | null;
  setDraft: (draft: QuoteDraft | null) => void;
};

const QuoteContext = createContext<QuoteContextValue>({ draft: null, setDraft: () => undefined });

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const value = useMemo(() => ({ draft, setDraft }), [draft]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export const useQuote = () => useContext(QuoteContext);

"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode, useRef, useEffect } from "react";
import { fetchSession, setSession } from "@/store/features/authSlice";
import type { LoginResponse } from "@/app/api/auth/login/types";

interface StoreProviderProps {
  children: ReactNode;
  initialUser?: LoginResponse | null;
}

export function StoreProvider({ children, initialUser }: StoreProviderProps) {
  const initialized = useRef(false);

  // Dispatch synchronously during render (before children mount) so the store
  // starts in the correct state on the very first paint — no isLoading flash.
  if (!initialized.current) {
    initialized.current = true;
    if (initialUser) {
      store.dispatch(setSession(initialUser));
    }
  }

  useEffect(() => {
    // Only hit the session API if we had no server-side cookie to seed from.
    if (!initialUser) {
      store.dispatch(fetchSession());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Provider store={store}>{children}</Provider>;
}

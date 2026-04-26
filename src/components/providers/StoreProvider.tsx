"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { ReactNode, useRef, useEffect } from "react";
import { fetchSession, setSession } from "@/store/features/authSlice";
import { fetchConfig } from "@/store/features/configSlice";
import { useAppDispatch } from "@/store/hooks";
import type { LoginResponse } from "@/app/_disabled_api/auth/login/types";

interface StoreProviderProps {
  children: ReactNode;
  initialUser?: LoginResponse | null;
}

function AppInitializer({ children, initialUser }: StoreProviderProps) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!initialUser) {
        dispatch(fetchSession());
      }
      dispatch(fetchConfig());
    }
  }, [dispatch, initialUser]);

  return <>{children}</>;
}

export function StoreProvider({ children, initialUser }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (initialUser) {
      storeRef.current.dispatch(setSession(initialUser));
    }
  }

  return (
    <Provider store={storeRef.current}>
      <AppInitializer initialUser={initialUser}>{children}</AppInitializer>
    </Provider>
  );
}

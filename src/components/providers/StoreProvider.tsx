"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode, useRef, useEffect } from "react";
import { fetchSession, setSession } from "@/store/features/authSlice";
import { fetchConfig } from "@/store/features/configSlice";
import { useAppDispatch } from "@/store/hooks";
import type { LoginResponse } from "@/app/api/auth/login/types";

interface StoreProviderProps {
  children: ReactNode;
  initialUser?: LoginResponse | null;
}

function AppInitializer({ children, initialUser }: StoreProviderProps) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    initialized.current = true;
    if (initialUser) {
      dispatch(setSession(initialUser));
    }
  }

  useEffect(() => {
    if (!initialUser) {
      dispatch(fetchSession());
    }
    dispatch(fetchConfig());
  }, [dispatch, initialUser]);

  return <>{children}</>;
}

export function StoreProvider({ children, initialUser }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <AppInitializer initialUser={initialUser}>{children}</AppInitializer>
    </Provider>
  );
}

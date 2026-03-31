"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode, useEffect } from "react";
import { fetchSession } from "@/store/features/authSlice";

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(fetchSession());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

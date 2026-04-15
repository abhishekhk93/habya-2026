"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchConfig } from "@/store/features/configSlice";

export function ConfigRefetcher() {
  const dispatch = useAppDispatch();
  const lastFetched = useAppSelector((state) => state.config.lastFetched);
  const status = useAppSelector((state) => state.config.status);

  useEffect(() => {
    // Revalidation logic (10 minutes)
    const tenMinutes = 10 * 60 * 1000;
    const isStale = !lastFetched || Date.now() - lastFetched > tenMinutes;

    if (isStale && status !== "loading") {
      dispatch(fetchConfig());
    }
  }, [dispatch, lastFetched, status]);

  return null;
}

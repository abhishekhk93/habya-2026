"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchConfig } from "@/store/features/configSlice";

const MAX_RETRIES = 3;

export function ConfigRefetcher() {
  const dispatch = useAppDispatch();
  const lastFetched = useAppSelector((state) => state.config.lastFetched);
  const status = useAppSelector((state) => state.config.status);
  const retryCount = useRef(0);

  useEffect(() => {
    // Revalidation logic (10 minutes)
    const tenMinutes = 10 * 60 * 1000;
    const isStale = !lastFetched || Date.now() - lastFetched > tenMinutes;

    if (isStale && status !== "loading") {
      if (status === "failed") {
        if (retryCount.current >= MAX_RETRIES) {
          return;
        }
        retryCount.current += 1;
      }
      dispatch(fetchConfig());
    } else if (status === "succeeded") {
      retryCount.current = 0;
    }
  }, [dispatch, lastFetched, status]);

  return null;
}

'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME } from "@/lib/auth";

export async function clearAuthCookie() {
  (await cookies()).delete(COOKIE_NAME);
}

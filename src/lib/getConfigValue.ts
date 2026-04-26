import { ConfigData } from '@/app/_disabled_api/config/types';

export function getConfigValue(
  configData: ConfigData | null | undefined,
  key: keyof ConfigData,
  fallbackValue: string | undefined
): string | undefined {
  const value = configData?.[key] ?? fallbackValue;

  if (value === undefined) {
    return undefined;
  }

  return String(value);
}

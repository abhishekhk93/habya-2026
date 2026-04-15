import { ConfigData } from '@/app/api/config/types';

export function getConfigValue(
  configData: ConfigData | null | undefined,
  key: keyof ConfigData,
  fallbackEnvKey: string
): string | undefined {
  const value = configData?.[key] ?? process.env[fallbackEnvKey];
  
  if (value === undefined) {
    return undefined;
  }
  
  return String(value);
}

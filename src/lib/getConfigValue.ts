import { store } from '@/store';
import { ConfigData } from '@/app/api/config/types';

export function getConfigValue(
  key: keyof ConfigData,
  fallbackEnvKey: string
): string | number | boolean {
  const state = store.getState();
  const configData = state.config.data;

  // 1. Try Redux store first
  let val: string | undefined;
  if (configData && configData[key] !== undefined) {
    val = configData[key];
  } else {
    // 2. Fallback to process.env
    val = process.env[fallbackEnvKey];
  }

  // 3. Basic type conversion
  if (val === undefined) return '';
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (!isNaN(Number(val)) && val.trim() !== '') return Number(val);
  
  return val;
}

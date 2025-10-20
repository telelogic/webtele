export type ConsentState = 'accepted' | 'declined' | 'unset';

const STORAGE_KEY = 'telelogic-cookie-consent';

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unset';
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'accepted' || value === 'declined') return value;
    return 'unset';
  } catch {
    return 'unset';
  }
}

export function setConsent(state: Exclude<ConsentState, 'unset'>) {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch {}
}

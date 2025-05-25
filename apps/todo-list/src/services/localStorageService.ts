export const localStorageService = {
  getValue: (reference: string, fallback?: string | object): string => {
    const localStorageValue = localStorage.getItem(reference);
    return (localStorageValue ? JSON.parse(localStorageValue) : fallback) || '';
  },

  getBooleanValue: (reference: string, fallback?: string): boolean => {
    const localStorageValue = localStorage.getItem(reference);
    const parsedValue = localStorageValue ? JSON.parse(localStorageValue) : fallback;
    const valueAsBoolean = parsedValue === 'true' ? true : false;
    return valueAsBoolean;
  },

  setValue: (reference: string, value: string | object): void => {
    localStorage.setItem(reference, JSON.stringify(value));
  },

  removeValue: (reference: string) => {
    localStorage.removeItem(reference);
  },
};

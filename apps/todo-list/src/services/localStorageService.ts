export const localStorageService = {
  getValue: (reference: string, fallback?: string) => {
    const localStorageValue = localStorage.getItem(reference);
    return localStorageValue ? JSON.parse(localStorageValue) : fallback;
  },

  setValue: (reference: string, value: string | object) => {
    localStorage.setItem(reference, JSON.stringify(value));
  },

  removeValue: (reference: string) => {
    localStorage.removeItem(reference);
  },
};

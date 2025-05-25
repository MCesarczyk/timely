import { createContext, useState } from 'react';

import { descriptions } from '../services/languages/descriptions';
import { localStorageService } from '../services/localStorageService';
import { Timer } from './Timer';

const savedLanguage = localStorageService.getValue('language', 'EN');

export const LanguageContext = createContext({
  language: savedLanguage,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: (savedLanguage: string) => {},
});

export const App = () => {
  const [language, setLanguage] = useState<string>(savedLanguage);

  document.title = descriptions[language].headerTitle;

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <Timer />
    </LanguageContext.Provider>
  );
};

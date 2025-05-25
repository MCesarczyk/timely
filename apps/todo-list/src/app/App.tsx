import { createContext, useState } from 'react';
import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';

import { descriptions } from 'services/languages/descriptions';
import { localStorageService } from 'services/localStorageService';
import { Nav } from 'app/Nav';
import { TasksPage } from 'app/tasks/tasksPage/TasksPage';
import { TaskPage } from 'app/tasks/TaskPage';
import { Timer } from 'app/timer/Timer';

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
      <HashRouter>
        <Nav
          navConfig={[
            {
              id: 1,
              path: '/tasks',
              label: descriptions[language].tasksPageTitle,
            },
            {
              id: 2,
              path: '/timer',
              label: descriptions[language].timerPageTitle,
            },
          ]}
        />
        <Routes>
          <Route path="/tasks/:id" element={<TaskPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

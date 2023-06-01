import { createContext, useState } from 'react';
import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';

import { descriptions } from 'common/languages/descriptions';
import { Nav } from 'common/nav/Nav';
import { TasksPage } from 'app/tasks/tasksPage/TasksPage';
import { TaskPage } from 'app/tasks/TaskPage';
import { AuthorPage } from 'app/author/AuthorPage';

export const LanguageContext = createContext({
  language: 'EN',
  setLanguage: (language: string) => {},
});

export const App = () => {
  const [language, setLanguage] = useState('EN');

  document.title = descriptions[language].headerTitle;

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <HashRouter>
        <Nav
          tasksPath={'/tasks'}
          tasksLabel={descriptions[language].tasksPageTitle}
          authorPath={'/author'}
          authorLabel={descriptions[language].authorPageTitle}
        />
        <Routes>
          <Route path="/tasks/:id" element={<TaskPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

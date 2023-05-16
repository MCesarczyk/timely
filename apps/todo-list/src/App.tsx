import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'common/languages/languageSlice';
import { descriptions } from 'common/languages/descriptions';
import { TasksPage } from 'features/tasks/tasksPage/TasksPage';
import { TaskPage } from 'features/tasks/TaskPage';
import { AuthorPage } from 'features/author/AuthorPage';
import { Nav } from 'common/nav/Nav';

export const App = () => {
  const language = useSelector(selectLanguage);

  document.title = descriptions[language].headerTitle;

  return (
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
  );
};

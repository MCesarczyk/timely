import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';

import { TasksPage } from 'app/tasks/tasksPage/TasksPage';
import { TaskPage } from 'app/tasks/TaskPage';

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </HashRouter>
  );
};

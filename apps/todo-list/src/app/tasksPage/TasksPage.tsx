import { useContext, useState } from 'react';

import { COMPLETED_TASKS_HIDDEN_KEY } from '~/tasks/constants';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { localStorageService } from '~/common/localStorageService';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { ListButtons } from './ListButtons';

export const TasksPage = () => {
  const [hideDone, setHideDone] = useState<boolean>(
    localStorageService.getBooleanValue(COMPLETED_TASKS_HIDDEN_KEY, 'false')
  );

  const onHideDoneToggle = () => {
    setHideDone(!hideDone);
    localStorageService.setValue(COMPLETED_TASKS_HIDDEN_KEY, String(!hideDone));
  };

  return (
    <main>
      <Header title="Tasks" />
      <Section
        title="Create a new task"
        body={<Form />}
        extraHeaderContent={null}
      />
      <Section
        title="Search tasks"
        body={<Search />}
        extraHeaderContent={null}
      />
      <Section
        title="List of tasks"
        body={<TasksList hideDone={hideDone} />}
        extraHeaderContent={
          <ListButtons
            hideDone={hideDone}
            toggleHideDone={onHideDoneToggle}
          />
        }
      />
    </main>
  );
};

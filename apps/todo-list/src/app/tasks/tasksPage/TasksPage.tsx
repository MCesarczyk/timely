import { useContext, useState } from 'react';

import { COMPLETED_TASKS_HIDDEN_KEY } from 'domain/tasks/constants';
import { descriptions } from 'services/languages/descriptions';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { localStorageService } from 'services/localStorageService';
import { LanguageContext } from 'app/App';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { ListButtons } from './ListButtons';

export const TasksPage = () => {
  const { language } = useContext(LanguageContext);

  const [hideDone, setHideDone] = useState<boolean>(
    localStorageService.getBooleanValue(COMPLETED_TASKS_HIDDEN_KEY, 'false')
  );

  const onHideDoneToggle = () => {
    setHideDone(!hideDone);
    localStorageService.setValue(COMPLETED_TASKS_HIDDEN_KEY, String(!hideDone));
  };

  return (
    <main>
      <Header title={descriptions[language].headerTitle} />
      <Section
        title={descriptions[language].sectionTitle}
        body={<Form language={language} />}
        extraHeaderContent={null}
      />
      <Section
        title={descriptions[language].searchSectionTitle}
        body={<Search />}
        extraHeaderContent={null}
      />
      <Section
        title={descriptions[language].tasksSectionTitle}
        body={<TasksList hideDone={hideDone} />}
        extraHeaderContent={
          <ListButtons
            language={language}
            hideDone={hideDone}
            toggleHideDone={onHideDoneToggle}
          />
        }
      />
    </main>
  );
};

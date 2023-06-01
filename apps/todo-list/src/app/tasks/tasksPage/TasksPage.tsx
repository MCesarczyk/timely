import { COMPLETED_TASKS_HIDDEN_KEY } from 'app/tasks/constants';
import { localStorageService } from 'services/localStorageService';
import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { ListButtons } from './ListButtons';
import { useContext, useState } from 'react';
import { LanguageContext } from '~/app/App';

export const TasksPage = () => {
  const { language } = useContext(LanguageContext);

  const [hideDone, setHideDone] = useState(
    localStorageService.getValue(COMPLETED_TASKS_HIDDEN_KEY, 'false')
  );

  return (
    <main>
      <Header title={descriptions[language].headerTitle} />
      <Section
        title={descriptions[language].sectionTitle}
        body={<Form language={language} />}
        extraHeaderContent={<></>}
      />
      <Section
        title={descriptions[language].searchSectionTitle}
        body={<Search />}
        extraHeaderContent={<></>}
      />
      <Section
        title={descriptions[language].tasksSectionTitle}
        body={<TasksList hideDone={hideDone} />}
        extraHeaderContent={
          <ListButtons
            language={language}
            hideDone={hideDone}
            setHideDone={setHideDone}
          />
        }
      />
    </main>
  );
};

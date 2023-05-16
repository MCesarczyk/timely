import { useDispatch, useSelector } from 'react-redux';
import { descriptions } from 'common/languages/descriptions';
import { selectLanguage } from 'common/languages/languageSlice';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { fetchExampleTasks, selectState } from 'features/tasks/tasksSlice';
import { Form } from './Form';
import { Search } from './Search';
import { TasksList } from './TasksList';
import { FormButtons } from './FormButtons';
import { Button } from './Button';

export const TasksPage = () => {
  const language = useSelector(selectLanguage);
  const state = useSelector(selectState);

  const dispatch = useDispatch();

  return (
    <main>
      <Header title={descriptions[language].headerTitle} />
      <Section
        title={descriptions[language].sectionTitle}
        body={
          <Form
            inputPlaceholder={descriptions[language].inputPlaceholder}
            formButtonInnerText={descriptions[language].formButtonInnerText}
          />
        }
        extraHeaderContent={
          <>
            <div>
              <Button disabled={state === 'loading'} onClick={() => dispatch(fetchExampleTasks())}>
                {state === 'loading'
                  ? descriptions[language].getExampleTasksButtonLoader
                  : descriptions[language].getExampleTasksButtonText}
              </Button>
            </div>
          </>
        }
      />
      <Section title={descriptions[language].searchSectionTitle} body={<Search />} extraHeaderContent={<></>} />
      <Section
        title={descriptions[language].tasksSectionTitle}
        body={<TasksList />}
        extraHeaderContent={
          <FormButtons
            setDoneButtonInnerText={descriptions[language].setDoneButtonInnerText}
            toggleButtonInnerTextVisible={descriptions[language].toggleButtonInnerTextVisible}
            toggleButtonInnerTextHidden={descriptions[language].toggleButtonInnerTextHidden}
          />
        }
      />
    </main>
  );
};

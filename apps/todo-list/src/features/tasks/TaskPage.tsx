import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { descriptions } from 'common/languages/descriptions';
import { selectLanguage } from 'common/languages/languageSlice';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { getTasksById } from 'features/tasks/tasksSlice';

export const TaskPage = () => {
  const { id } = useParams();
  const task = useSelector((state: RootState) => getTasksById(state, id));
  const language = useSelector(selectLanguage);

  return (
    <main>
      <Header title={descriptions[language].taskPageTitle} />
      <Section
        title={!task ? descriptions[language].taskStatusNotFound : task.content}
        body={
          <>
            <strong>{task && descriptions[language].taskStatusLabel}</strong>
            {task ? (task.done ? descriptions[language].taskStatusDone : descriptions[language].taskStatusUndone) : ''}
          </>
        }
        extraHeaderContent={<></>}
      />
    </main>
  );
};

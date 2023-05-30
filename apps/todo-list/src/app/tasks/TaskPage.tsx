import { useSelector } from 'react-redux';
import { descriptions } from 'common/languages/descriptions';
import { selectLanguage } from 'common/languages/languageSlice';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { tasksApiService } from './tasksApiService';
import { useRequiredRouteParams } from '~/common/hooks';

export const TaskPage = () => {
  const language = useSelector(selectLanguage);
  const id = useRequiredRouteParams('id');

  const { task } = tasksApiService.getTask(id);

  return (
    <main>
      <Header title={descriptions[language].taskPageTitle} />
      <Section
        title={!task ? descriptions[language].taskStatusNotFound : task.content}
        body={
          <>
            <strong>{task && descriptions[language].taskStatusLabel}</strong>
            {task
              ? task.done
                ? descriptions[language].taskStatusDone
                : descriptions[language].taskStatusUndone
              : ''}
          </>
        }
        extraHeaderContent={<></>}
      />
    </main>
  );
};

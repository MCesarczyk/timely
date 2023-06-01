import { useContext } from 'react';

import { descriptions } from 'common/languages/descriptions';
import { useRequiredRouteParams } from 'common/hooks';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { tasksApiService } from './tasksApiService';
import { LanguageContext } from '../App';

export const TaskPage = () => {
  const { language } = useContext(LanguageContext);

  const id = useRequiredRouteParams('id');

  const { task } = tasksApiService.useGetTask(id);

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

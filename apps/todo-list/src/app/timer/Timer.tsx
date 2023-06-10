import { useContext, useState } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from 'app/App';
import { Button } from '../tasks/tasksPage/Button';
import { Clock } from './Clock';
import { Counter } from './Counter';
import { tasksApiService } from '../tasks/tasksApiService';

export const Timer = () => {
  const { language } = useContext(LanguageContext);

  const { taskList: tasks } = tasksApiService.useGetTasks();

  const [startMark, setStartMark] = useState<number>(Date.now());
  const [isCounting, setIsCounting] = useState<boolean>(false);

  return (
    <main>
      <Header title={descriptions[language].timerPageTitle} />
      <Section
        title={descriptions[language].timerSectionTitle}
        body={
          <CounterWrapper>
            <Button onClick={() => setStartMark(Date.now())}>Start</Button>
            <Select>
              {tasks
                .filter(({ done }) => !done)
                .map(({ id, title }) => (
                  <option key={id}>{title}</option>
                ))}
            </Select>
            <Counter time={startMark} isCounting={isCounting} />
          </CounterWrapper>
        }
        extraHeaderContent={<Clock />}
      />
    </main>
  );
};

const CounterWrapper = styled.div`
  display: flex;
`;

const Select = styled.select`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: 10px;
  flex-grow: 1;
  margin: 10px;
`;

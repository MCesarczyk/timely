import { useContext, useState } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from 'app/App';
import { Button } from 'app/tasks/tasksPage/Button';
import { tasksApiService } from 'app/tasks/tasksApiService';
import { Clock } from './Clock';
import { Counter } from './Counter';
import { useCurrentDate } from './useCurrentDate';
import { periodsApiService } from './periodsApiService';

export const Timer = () => {
  const { language } = useContext(LanguageContext);

  const { taskList: tasks } = tasksApiService.useGetTasks();

  const [taskId, setTaskId] = useState<number>(0);
  const [timeFrames, setTimeFrames] = useState<number[]>([]);
  const [startMark, setStartMark] = useState<number>(Date.now());
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const date = useCurrentDate(isCounting);

  const timeframesSum = timeFrames.reduce((a, b) => a + b, 0);

  const onTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const task = tasks.find(({ title }) => title === value);
    setTaskId(task?.id || 0);
  };

  const { createPeriod } = periodsApiService.useCreatePeriod();

  const onButtonClick = () => {
    if (taskId > 0) {
      setIsCounting((isCounting) => !isCounting);
      if (!isCounting) {
        setStartMark(Date.now());
      }

      if (isCounting) {
        setTimeFrames([...timeFrames, Date.now() - startMark]);
        createPeriod({
          id: Math.floor(Math.random() * 100),
          todoId: taskId,
          startTime: new Date(startMark).toISOString(),
          endTime: new Date(Date.now()).toISOString(),
          type: 'work',
        });
      }
    }
  };

  return (
    <main>
      <Header title={descriptions[language].timerPageTitle} />
      <Section
        title={descriptions[language].timerSectionTitle}
        body={
          <CounterWrapper>
            <Button onClick={onButtonClick}>Start</Button>
            <Select onChange={onTaskChange}>
              <option value={0}>choose task &hellip;</option>
              {tasks
                .filter(({ done }) => !done)
                .map(({ id, title }) => (
                  <option key={id}>{title}</option>
                ))}
            </Select>
            <Counter
              time={
                isCounting ? date + timeframesSum - startMark : timeframesSum
              }
              isCounting={isCounting}
            />
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

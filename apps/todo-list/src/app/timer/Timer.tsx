import { useContext, useState } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'common/languages/descriptions';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { LanguageContext } from 'app/App';
import { tasksApiService } from 'app/tasks/tasksApiService';
import { Clock } from './Clock';
import { Counter } from './Counter';
import { useCurrentDate } from './useCurrentDate';
import { periodsApiService } from './periodsApiService';
import { modes } from './constants';
import { ThumbButton } from './ThumbButton';
import { Select } from './Select';

export const Timer = () => {
  const { language } = useContext(LanguageContext);

  const { taskList: tasks } = tasksApiService.useGetTasks();

  const [taskId, setTaskId] = useState<number>(0);
  const [modeId, setModeId] = useState<number>(0);
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

  const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const mode = modes.find(({ name }) => name === value);
    setModeId(mode?.id || 0);
  };

  const { createPeriod } = periodsApiService.useCreatePeriod();

  const onButtonClick = () => {
    if (taskId > 0 && modeId > 0) {
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
          type: modes.filter(({ id }) => id === modeId)[0].name,
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
            <CounterInnerWrapper>
              <Select onChange={onTaskChange}>
                <option value={0}>choose task &hellip;</option>
                {tasks
                  .filter(({ done }) => !done)
                  .map(({ id, title }) => (
                    <option key={id}>{title}</option>
                  ))}
              </Select>
              <Select onChange={onModeChange}>
                <option value={0}>choose mode &hellip;</option>
                {modes.map(({ id, name }) => (
                  <option key={id}>{name}</option>
                ))}
              </Select>
            </CounterInnerWrapper>
            <CounterInnerWrapper>
              <ThumbButton
                onClick={onButtonClick}
                disabled={!taskId || !modeId}
              >
                {'\u25B6'}
              </ThumbButton>
              <Counter
                time={
                  isCounting ? date + timeframesSum - startMark : timeframesSum
                }
                isCounting={isCounting}
              />
            </CounterInnerWrapper>
          </CounterWrapper>
        }
        extraHeaderContent={<Clock />}
      />
    </main>
  );
};

const CounterWrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    flex-direction: column;
    align-items: center;
  }
`;

const CounterInnerWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

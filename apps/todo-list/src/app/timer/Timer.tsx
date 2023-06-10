import { useContext, useEffect, useState } from 'react';
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

export const Timer = () => {
  const { language } = useContext(LanguageContext);

  const { taskList: tasks } = tasksApiService.useGetTasks();

  let [timeFrames, setTimeFrames] = useState<number[]>([]);
  const [startMark, setStartMark] = useState<number>(Date.now());
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const date = useCurrentDate(isCounting);

  const timeframesSum = timeFrames.reduce((a, b) => a + b, 0);

  useEffect(() => {
    console.log(
      timeFrames,
      timeFrames.length,
      new Date(timeframesSum).toLocaleTimeString()
    );
  }, [timeFrames.length]);

  const onButtonClick = () => {
    setIsCounting((isCounting) => !isCounting);
    !isCounting && setStartMark(Date.now());
    isCounting && setTimeFrames([...timeFrames, Date.now() - startMark]);
  };

  return (
    <main>
      <Header title={descriptions[language].timerPageTitle} />
      <Section
        title={descriptions[language].timerSectionTitle}
        body={
          <CounterWrapper>
            <Button onClick={onButtonClick}>Start</Button>
            <Select>
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

import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { modes } from 'domain/periods/constants';
import { tasksApiService } from 'infra/tasks/tasksApiService';
import { periodsApiService } from 'infra/periods/periodsApiService';
import { descriptions } from 'services/languages/descriptions';
import { Language } from 'services/languages/types';
import { LanguageContext } from 'app/App';
import { useCurrentDate } from 'app/timer/useCurrentDate';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { ThumbButton } from 'components/ThumbButton';
import { Select } from 'components/Select';
import { Spinner, SpinnerWrapper } from 'components/Spinner';
import { Clock } from './Clock';
import { Counter } from './Counter';
import { ReactComponent as PlayIcon } from 'assets/svg/playIcon.svg';
import { ReactComponent as StopIcon } from 'assets/svg/stopIcon.svg';

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

  const { periodList, isLoading: isPeriodsListLoading } =
    periodsApiService.useGetPeriods();

  const { taskList, isLoading: isTasksListLoading } =
    tasksApiService.useGetTasks();

  return (
    <main>
      <Header title={descriptions[language].timerPageTitle} />
      <Section
        title={descriptions[language].timerSectionTitle}
        body={
          <CounterWrapper>
            <CounterInnerWrapper>
              <Select onChange={onTaskChange}>
                <option value={0}>
                  {descriptions[language].taskSelectPlaceholder} &hellip;
                </option>
                {tasks
                  .filter(({ done }) => !done)
                  .map(({ id, title }) => (
                    <option key={id}>{title}</option>
                  ))}
              </Select>
              <Select onChange={onModeChange}>
                <option value={0}>
                  {descriptions[language].modeSelectPlaceholder} &hellip;
                </option>
                {modes.map(({ id, label }) => (
                  <option key={id}>{label[language as Language]}</option>
                ))}
              </Select>
            </CounterInnerWrapper>
            <CounterInnerWrapper>
              <ThumbButton
                onClick={onButtonClick}
                disabled={!taskId || !modeId}
              >
                {isCounting ? <StopIcon /> : <PlayIcon />}
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
      <Section
        title={descriptions[language].timerHistorySectionTitle}
        body={
          <>
            {isPeriodsListLoading || isTasksListLoading ? (
              <SpinnerWrapper>
                <Spinner caption="Please wait while results are being loaded..." />
              </SpinnerWrapper>
            ) : (
              <HistoryList>
                {periodList
                  .sort(
                    (a, b) =>
                      new Date(b.startTime).getTime() -
                      new Date(a.startTime).getTime()
                  )
                  .map(({ id, todoId, startTime, endTime, type }) => {
                    const task = taskList.find(({ id }) => id === todoId);
                    return (
                      <HistoryListItem key={id}>
                        <div>
                          <TaskListLabel>Task:</TaskListLabel>
                          {task?.title}
                        </div>
                        <div>
                          <TaskListLabel>Type:</TaskListLabel>
                          {type}
                        </div>
                        <div>
                          <TaskListLabel>From:</TaskListLabel>
                          {new Date(startTime).toLocaleString(language)}
                        </div>
                        <div>
                          <TaskListLabel>To:</TaskListLabel>
                          {new Date(endTime).toLocaleString(language)}
                        </div>
                        <div>
                          <TaskListLabel>Time:</TaskListLabel>
                          {new Date(
                            new Date(endTime).getTime() -
                              new Date(startTime).getTime() -
                              60 * 60_000
                          ).toLocaleTimeString('PL')}
                        </div>
                      </HistoryListItem>
                    );
                  })}
              </HistoryList>
            )}
          </>
        }
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

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.borders};

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

const TaskListLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  margin-right: 8px;
  opacity: 0.5;
`;

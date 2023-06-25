import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { tasksApiService } from 'infra/tasks/tasksApiService';
import { periodsApiService } from 'infra/periods/periodsApiService';
import { LanguageContext } from 'app/App';
import { Spinner, SpinnerWrapper } from 'components/Spinner';
import { Navigation } from 'app/timer/Navigation';

export const History = () => {
  const { language } = useContext(LanguageContext);

  const perPage = 10;
  const [page, setPage] = useState<number>(1);


  const {
    periodList,
    periodListTotal,
    isLoading: isPeriodsListLoading,
    getList,
  } = periodsApiService.useGetPeriods(perPage);

  const totalPages = Math.ceil(periodListTotal / perPage);

  useEffect(() => {
    getList(page);
  }, [page]);


  const { taskList, isLoading: isTasksListLoading } =
    tasksApiService.useGetTasks();

  return (
    <>
      {isPeriodsListLoading || isTasksListLoading ? (
        <SpinnerWrapper>
          <Spinner caption="Please wait while results are being loaded..." />
        </SpinnerWrapper>
      ) : (
        <>
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
          <Navigation page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </>
  );
};

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

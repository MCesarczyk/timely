import { styled } from 'styled-components';

import { tasksApiService } from '~/tasks/tasksApiService';

interface FormButtonsProps {
  hideDone: boolean;
  toggleHideDone: () => void;
}

export const ListButtons = ({ hideDone, toggleHideDone }: FormButtonsProps) => {
  const { taskList: tasks } = tasksApiService.useGetTasks();

  const allDone = tasks.every(({ done }) => done);

  const updateTask = tasksApiService.useUpdateTask();

  const markAllTasksDone = () => {
    tasks.forEach((task) => {
      updateTask.mutate({
        ...task,
        done: true,
      });
    });
  };

  return (
    <ButtonsWrapper>
      {tasks.length > 0 && (
        <>
          <Button onClick={toggleHideDone}>
            {hideDone
              ? 'Show completed tasks'
              : 'Hide completed tasks'}
          </Button>
          <Button onClick={markAllTasksDone} disabled={allDone}>
            {'Mark all as done'}
          </Button>
        </>
      )}
    </ButtonsWrapper>
  );
};

export const ButtonsWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 400;
  background-color: transparent;
  border: none;
  transition: 0.5s;

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(120%);
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: unset;
  }
`;

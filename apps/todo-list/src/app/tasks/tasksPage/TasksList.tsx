import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { css, styled } from 'styled-components';
import { removeTask, selectHideDone } from 'app/tasks/tasksSlice';
import { SEARCH_QUERY_PARAM_NAME } from './constants';
import { tasksApiService } from '../tasksApiService';

export const TasksList = () => {
  const location = useLocation();
  const query: string | null = new URLSearchParams(location.search).get(
    SEARCH_QUERY_PARAM_NAME
  );

  const { taskList: tasks } = tasksApiService.getTasks();

  const hideDone = useSelector(selectHideDone);
  const dispatch = useDispatch();

  const { updateTask } = tasksApiService.updateTask();

  const toggleTaskDone = (id: string) => {
    updateTask({
      id,
      done: !tasks.find((task) => task.id === id)?.done,
      content: tasks.find((task) => task.id === id)?.content || '',
    });
  };

  const { deleteTask } = tasksApiService.deleteTask();

  const removeTask = (id: string) => deleteTask(id);

  return (
    <StyledTaskList>
      {tasks.map((task) => (
        <ListItem key={task.id} hidden={task.done && hideDone}>
          <Button $toggleDone onClick={() => toggleTaskDone(task.id)}>
            {task.done ? '✔' : ' '}
          </Button>
          <TaskContent $done={task.done}>
            <StyledLink to={`/tasks/${task.id}`}>{task.content}</StyledLink>
          </TaskContent>
          <Button $remove onClick={() => removeTask(task.id)}>
            🗑
          </Button>
        </ListItem>
      ))}
    </StyledTaskList>
  );
};

export const StyledTaskList = styled.ul`
  background-color: ${({ theme }) => theme.color.background};
  padding: 15px;
  list-style-type: none;
  width: 100%;
  margin: 0 auto;
`;

export const ListItem = styled.li`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 6px;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.color.borders};
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};

  &:active {
    filter: brightness(150%);
  }
`;

export const TaskContent = styled.span<{ $done: boolean }>`
  word-break: break-all;

  ${({ $done }) =>
    $done &&
    css`
      text-decoration: line-through;
    `}
`;

export const Button = styled.button<{
  $toggleDone?: boolean;
  $remove?: boolean;
}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-content: center;
  color: ${({ theme }) => theme.color.fontLight};
  border: none;
  padding: 5px;
  width: 28px;
  height: 28px;
  transition: 0.5s;

  ${({ $toggleDone }) =>
    $toggleDone &&
    css`
      background-color: ${({ theme }) => theme.color.toggleDone};

      &:hover {
        filter: brightness(130%);
      }

      &:active {
        filter: brightness(160%);
        box-shadow: inset 1px 1px 3px ${({ theme }) => theme.color.shadows};
      }
    `}

  ${({ $remove }) =>
    $remove &&
    css`
      background-color: ${({ theme }) => theme.color.remove};

      &:hover {
        filter: brightness(130%);
      }

      &:active {
        filter: brightness(160%);
        box-shadow: inset 1px 1px 3px ${({ theme }) => theme.color.shadows};
      }
    `}
`;

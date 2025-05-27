import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import { useRequiredRouteParams } from 'common/hooks';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { tasksApiService } from '~/tasks/tasksApiService';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Task } from '~/tasks/types';
import { NavigationLink } from 'components/NavigationLink';

export const TaskPage = () => {
  const taskInitialState: Task = {
    id: 0,
    title: '',
    content: '',
    done: false,
    createdAt: '',
  };

  const [editMode, setEditMode] = useState(false);
  const [taskBatch, setTaskBatch] = useState(taskInitialState);

  const id = useRequiredRouteParams('id');

  const { task } = tasksApiService.useGetTask(id);

  const updateTask = tasksApiService.useUpdateTask();

  const toggleEditMode = () => {
    editMode && updateTask.mutate(taskBatch);
    setEditMode((editMode) => !editMode);
  };

  const exitEditMode = () => {
    setEditMode(false);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskBatch({
      ...taskBatch,
      title: e.target.value,
    });
  };

  const onContentChange = (value: string | undefined) => {
    setTaskBatch({
      ...taskBatch,
      content: value || '',
    });
  };

  useEffect(() => {
    setTaskBatch({
      ...taskBatch,
      id: Number(id),
      title: task?.title || '',
      content: task?.content || '',
      done: task?.done || false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  return (
    <main>
      <Header title="Task details" />
      <Section
        title={
          !task ? (
            'Task not found'
          ) : editMode ? (
            <Input
              $tiny
              placeholder="add title"
              value={taskBatch.title}
              onChange={onTitleChange}
            />
          ) : (
            task.title
          )
        }
        extraHeaderContent={
          <>
            <Button color="#000" background="#ffff76" onClick={toggleEditMode}>
              {editMode
                ? 'Update Task'
                : 'Edit Task'}
            </Button>
            {editMode && (
              <Button color="#fff" background="#dc143c" onClick={exitEditMode}>
                {'Cancel'}
              </Button>
            )}
          </>
        }
        body={
          <TaskContentWrapper>
            <div>
              <strong>{task && 'Status: '}</strong>
              {task
                ? task.done
                  ? 'Completed'
                  : 'Not completed'
                : ''}
            </div>
            <TextareaWrapper data-color-mode="light">
              {editMode ? (
                <MDEditor
                  height={300}
                  value={taskBatch.content}
                  onChange={onContentChange}
                />
              ) : (
                <MDEditor.Markdown source={task?.content} />
              )}
            </TextareaWrapper>
            <NavigationLinkWrapper>
              <NavigationLink label="<<" path="/tasks" />
            </NavigationLinkWrapper>
          </TaskContentWrapper>
        }
      />
    </main>
  );
};

const TaskContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextareaWrapper = styled.div`
  padding-top: 24px;
`;

const NavigationLinkWrapper = styled.div`
  margin-top: 48px;
`;

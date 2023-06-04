import { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import { descriptions } from 'common/languages/descriptions';
import { useRequiredRouteParams } from 'common/hooks';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { tasksApiService } from './tasksApiService';
import { LanguageContext } from '../App';
import { Button } from './tasksPage/Button';
import { Input } from './tasksPage/Input';

export const TaskPage = () => {
  const taskInitialState = {
    id: '',
    title: '',
    content: '',
    done: false,
    createdAt: '',
  };

  const [editMode, setEditMode] = useState(false);
  const [taskBatch, setTaskBatch] = useState(taskInitialState);

  const { language } = useContext(LanguageContext);

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
      id: id,
      title: task?.title || '',
      content: task?.content || '',
      done: task?.done || false,
    });
  }, [editMode]);

  return (
    <main>
      <Header title={descriptions[language].taskPageTitle} />
      <Section
        title={
          !task ? (
            descriptions[language].taskStatusNotFound
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
        body={
          <TaskContentWrapper>
            <div>
              <strong>{task && descriptions[language].taskStatusLabel}</strong>
              {task
                ? task.done
                  ? descriptions[language].taskStatusDone
                  : descriptions[language].taskStatusUndone
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
          </TaskContentWrapper>
        }
        extraHeaderContent={
          <>
            <Button color="#000" background="#ffb200" onClick={toggleEditMode}>
              {editMode
                ? descriptions[language].taskPageUpdateButtonText
                : descriptions[language].taskPageEditButtonText}
            </Button>
            {editMode && (
              <Button color="#fff" background="#dc143c" onClick={exitEditMode}>
                {descriptions[language].taskPageCancelButtonText}
              </Button>
            )}
          </>
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

const Textarea = styled.textarea`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: 10px;
  flex-grow: 1;
  margin: 10px;
  resize: vertical;
`;

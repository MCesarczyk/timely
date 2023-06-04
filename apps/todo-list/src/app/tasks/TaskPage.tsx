import { useContext, useEffect, useState } from 'react';

import { descriptions } from 'common/languages/descriptions';
import { useRequiredRouteParams } from 'common/hooks';
import { Header } from 'common/Header';
import { Section } from 'common/Section';
import { tasksApiService } from './tasksApiService';
import { LanguageContext } from '../App';
import { Button } from './tasksPage/Button';
import { Input } from './tasksPage/Input';
import { styled } from 'styled-components';

export const TaskPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { language } = useContext(LanguageContext);

  const id = useRequiredRouteParams('id');

  const { task } = tasksApiService.useGetTask(id);

  const updateTask = tasksApiService.useUpdateTask();

  const toggleEditMode = () => setEditMode((editMode) => !editMode);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const defaultTaskTemplate = {
    id: '',
    title: '',
    content: '',
    done: false,
    createdAt: '',
  };

  const inputTask = task || defaultTaskTemplate;

  useEffect(() => {
    if (!editMode) {
      setTitle(task?.title || '');
      setContent(task?.content || '');
    }

    if (editMode) {
      console.log({
        // updateTask.mutate({
        ...inputTask,
        title: title,
        content: content,
      });
    }
  }, [editMode]);

  return (
    <main>
      <Header title={descriptions[language].taskPageTitle} />
      <Section
        title={
          !task ? (
            descriptions[language].taskStatusNotFound
          ) : editMode ? (
            task.title
          ) : (
            <Input
              tiny
              placeholder="add title"
              value={title}
              onChange={onTitleChange}
            />
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
            {editMode ? (
              <p>{task?.content}</p>
            ) : (
              <Textarea value={content} onChange={onContentChange} />
            )}
          </TaskContentWrapper>
        }
        extraHeaderContent={
          <Button color="#000" background="#ffb200" onClick={toggleEditMode}>
            {editMode ? 'Edit' : 'Update'}
          </Button>
        }
      />
    </main>
  );
};

const TaskContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: 10px;
  flex-grow: 1;
  margin: 10px;
  resize: vertical;
`;

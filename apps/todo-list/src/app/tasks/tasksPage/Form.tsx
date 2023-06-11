import { FormEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { Input } from 'app/tasks/tasksPage/Input';
import { Button } from 'app/tasks/tasksPage/Button';
import { descriptions } from 'common/languages/descriptions';
import { tasksApiService } from '../tasksApiService';

interface FormProps {
  language: string;
}

export const Form = ({ language }: FormProps) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { createTask } = tasksApiService.useCreateTask();

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedContent = newTaskContent.trim();
    if (trimmedContent === '') {
      setNewTaskContent('');
      return;
    }

    setNewTaskContent('');
    if (inputRef.current !== null && 'focus' in inputRef.current) {
      inputRef.current.focus();
    }

    createTask({
      id: Math.random(),
      title: trimmedContent,
      content: '',
      done: false,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <FormComponent onSubmit={onFormSubmit}>
      <Input
        ref={inputRef}
        value={newTaskContent}
        placeholder={descriptions[language].inputPlaceholder}
        onChange={({ target }) => setNewTaskContent(target.value)}
        autoFocus
      />
      <Button>{descriptions[language].formButtonInnerText}</Button>
    </FormComponent>
  );
};

export const FormComponent = styled.form`
  background-color: ${({ theme }) => theme.color.background};
  padding: 10px;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    flex-direction: column;
  }
`;

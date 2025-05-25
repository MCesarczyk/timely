import { FormEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { descriptions } from 'services/languages/descriptions';
import { tasksApiService } from 'features/tasks/tasksApiService';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

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

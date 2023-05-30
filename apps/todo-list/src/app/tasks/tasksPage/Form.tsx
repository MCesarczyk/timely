import { FormEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { Input } from 'app/tasks/tasksPage/Input';
import { Button } from 'app/tasks/tasksPage/Button';
import { tasksApiService } from '../tasksApiService';

interface FormProps {
  inputPlaceholder: string;
  formButtonInnerText: string;
}

export const Form = ({ inputPlaceholder, formButtonInnerText }: FormProps) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { createTask } = tasksApiService.createTask();

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
      id: Math.random().toString(),
      content: trimmedContent,
      done: false,
    });
  };

  return (
    <FormComponent onSubmit={onFormSubmit}>
      <Input
        ref={inputRef}
        value={newTaskContent}
        placeholder={inputPlaceholder}
        onChange={({ target }) => setNewTaskContent(target.value)}
        autoFocus
      />
      <Button>{formButtonInnerText}</Button>
    </FormComponent>
  );
};

export const FormComponent = styled.form`
  background-color: ${({ theme }) => theme.color.background};
  padding: 10px;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.tabletMax}) {
    flex-direction: column;
  }
`;

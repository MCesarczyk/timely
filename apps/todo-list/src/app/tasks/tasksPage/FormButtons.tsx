import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import {
  selectTasks,
  toggleHideDone,
  setAllDone,
  selectHideDone,
  selectIfAllDone,
} from 'app/tasks/tasksSlice';
import { descriptions } from '~/common/languages/descriptions';

interface FormButtonsProps {
  language: string;
}

export const FormButtons = ({ language }: FormButtonsProps) => {
  const tasks = useSelector(selectTasks);
  const hideDone = useSelector(selectHideDone);
  const allDone = useSelector(selectIfAllDone);
  const dispatch = useDispatch();

  return (
    <ButtonsWrapper>
      {tasks.length > 0 && (
        <>
          <Button onClick={() => dispatch(toggleHideDone())}>
            {hideDone
              ? descriptions[language].toggleButtonInnerTextHidden
              : descriptions[language].toggleButtonInnerTextVisible}
          </Button>
          <Button onClick={() => dispatch(setAllDone())} disabled={allDone}>
            {descriptions[language].setDoneButtonInnerText}
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

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
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

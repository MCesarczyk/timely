import { styled } from 'styled-components';

export const Button = styled.button<{ color?: string; background?: string }>`
  display: flex;
  align-content: center;
  justify-content: center;
  color: ${({ color }) => color || (({ theme }) => theme.color.fontLight)};
  background-color: ${({ background }) =>
  background || (({ theme }) => theme.color.primary)};
  border: none;
  padding: 5px;
  padding: 10px;
  margin: 10px;
  transition: background 0.5s, transform 1s;

  &:hover {
    filter: brightness(130%);
    transform: scale(1.05);
  }

  &:active {
    filter: brightness(160%);
    box-shadow: 1px 1px 2px darkgrey;
  }

  &:disabled {
    filter: grayscale();
    cursor: unset;
    pointer-events: none;
  }
`;

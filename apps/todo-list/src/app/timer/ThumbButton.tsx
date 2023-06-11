import { styled } from 'styled-components';

export const ThumbButton = styled.button<{
  color?: string;
  background?: string;
}>`
  font-size: 24px;
  aspect-ratio: 1;
  min-width: 48px;
  max-width: 48px;
  border-radius: 50%;
  color: ${({ color }) => color || (({ theme }) => theme.color.fontLight)};
  background-color: ${({ background }) =>
    background || (({ theme }) => theme.color.primary)};
  border: none;
  margin: 10px;
  padding: 0;
  display: grid;
  place-items: center;
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

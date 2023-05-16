import { styled } from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.fontLight};
  background-color: ${({ theme }) => theme.color.primary};
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
    box-shadow: inset 1px 1px 2px darkgrey;
  }
`;

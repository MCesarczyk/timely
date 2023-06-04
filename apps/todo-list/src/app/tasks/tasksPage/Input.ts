import styled from 'styled-components';

export const Input = styled.input<{ $tiny?: boolean }>`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: ${({ $tiny }) => $tiny ? 4 : 10}px;
  flex-grow: 1;
  margin: ${({ $tiny }) => $tiny ? 4 : 10}px;
`;

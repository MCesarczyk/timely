import styled from 'styled-components';

export const Input = styled.input`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: 10px;
  flex-grow: 1;
  margin: 10px;
`;

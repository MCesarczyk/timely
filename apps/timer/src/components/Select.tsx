import { styled } from 'styled-components';

export const Select = styled.select`
  border: solid 1px ${({ theme }) => theme.color.borders};
  padding: 10px;
  flex-grow: 1;
  width: 100%;
  text-overflow: ellipsis;
  margin: 10px;
`;

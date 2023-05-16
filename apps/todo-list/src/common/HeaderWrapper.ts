import { styled } from 'styled-components';

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding-right: 10px;
  margin: 0 0 1px 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

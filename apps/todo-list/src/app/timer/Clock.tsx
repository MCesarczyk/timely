import { useContext } from 'react';
import styled from 'styled-components';

import { LanguageContext } from '../App';
import { useCurrentDate } from './useCurrentDate';

export const Clock = () => {
  const { language } = useContext(LanguageContext);

  const date = useCurrentDate(true);

  const time = new Date(date);

  return (
    <ClockContainer>
      <ClockElement>
        <ClockLabel>
          {time.toLocaleString(language, {
            weekday: 'long',
          })}
        </ClockLabel>
        {time.toLocaleString(language, {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </ClockElement>
    </ClockContainer>
  );
};

export const ClockContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const ClockElement = styled.p`
  font-family: monospace;
  font-size: 12px;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const ClockLabel = styled.span`
  margin-right: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;
